const path = require('path')
const { body, validationResult } = require('express-validator/check')
const { matchedData, sanitizeBody } = require('express-validator/filter')

module.exports = (app, passport, models) => {

  const root = path.resolve(__dirname, '..')
  const public = path.join(root, 'public')

  const { User, Poll } = models

  ///////////////////////////////////////////////////////////
  // Testing/Debug Middleware, DELETE LATER
  ///////////////////////////////////////////////////////////
  app.use((req, res, next) => {
    const { user = { username: null }, sessionID } = req
    console.log(`DEBUG user: ${user.username} sessionID: ${req.sessionID}`)
    next()
  })


  ///////////////////////////////////////////////////////////
  // Calls to API
  ///////////////////////////////////////////////////////////

  // Get all Users
  app.get('/api/users', (req, res, next) => {
    User.getUsers()
    .then(docs => {
      res.type('json').send(docs)
    })
    .catch(next)
  })

  // Get all Polls
  app.get('/api/polls', (req, res, next) => {


    Poll.getPolls()
    .then(docs => {
      res.type('json').send(docs)
    })
    .catch(next)
  })

  // Test if API is available
  app.get('/api/:param', (req, res, next) => {
    res.type('json').send({
      'api_available': 'success'
    })
  })


  // Get all polls of a single user
  app.get('/api/:user/polls', (req, res, next) => {

    User
    .findOne({ username: req.params.user })
    .populate('polls')
    .exec((err, user) => {
      if (err) return next(Error(err))

      res.type('json').send({
        success: true,
        message: '',
        polls: user ? user.polls : []
      })
    })
  })

  
  // Get a single poll for a single user
  app.get('/api/:user/polls/:poll', (req, res, next) => {

    const { user, poll } = req.params

    User.findOne({ username: user })
    .exec((err, user) => {
      if (err) return next(Error(err))
      if (!user) return next(Error('User Not Found.'))

      Poll.findOne({ shortName: poll, createdBy: user._id })
      .exec((err, poll) => {
        if (err) return next(Error(err))
        if (!poll) return next(Error('Poll Not Found.'))
        res.type('json').send({
          success: true,
          poll: poll,
          username: user.username
        })
      })
    })
  })
  
  
  // Vote on a single poll
  app.post('/api/:user/polls/:poll', (req, res, next) => {
    const { body, params, sessionID } = req
    const { selectedChoice } = body
    const expiry = 60 * 1000 // 60 seconds
    
    const updateComplete = (err, doc, timeRemaining=expiry) => {
      if (err) return next(Error(err))
      if (!doc) return next(Error('Poll Not Found!'))

      res.type('json').send({
        success: true,
        poll: doc,
        error: { message: 'No Error', timeRemaining }
      })
    }

    Poll
    .findOne({ 'shortName': params.poll })
    .populate('createdBy')
    .exec((err, poll) => {

      if (err) return next(Error(err))
      if (!poll) return next(Error('Invalid Poll Short Name'))
      if (poll.createdBy.username !== params.user) {
        return next(Error('Invalid Poll Short Name or User'))
      }

      // Filter all but recent voters based on expiry time
      const recentVoters = poll.voters.filter(v => {
        return Date.now() - v.datevoted < expiry
      })
      const voterIds = recentVoters.map(({sessionID}) => sessionID)
      const voterIndex = voterIds.indexOf(req.sessionID)


      let timeRemaining
      if (~voterIndex) {
        return next({
          message: "Not enough time has elapsed since previous vote",
          timeRemaining: Math.floor(
            (expiry - (Date.now() - poll.voters[voterIndex].datevoted)))
        })
      } else {
        recentVoters.push({
          sessionID: sessionID,
          datevoted: Date.now()
        })
      }

      // Clone poll choices
      const choices = JSON.parse(JSON.stringify(poll.choices))

      // Add new choice if doesn't exist else increment choice
      const choicesNames = choices.map(({choice})=>choice)
      const choiceIndex = choicesNames.indexOf(selectedChoice)
      if (~choiceIndex) {
        choices[choiceIndex].votes += 1
      } else {
        choices.push({choice: selectedChoice, votes: 1})
      }

      // Update Poll
      Poll.findByIdAndUpdate(
        poll._id,
        {
          $set: {
            'choices': choices,
            'voters': recentVoters,
          },
        },
        { new: true },
      )
      .exec((err, doc) => updateComplete(err, doc, timeRemaining))
    })
  })


  // Delete a single poll for a single user
  app.post('/api/poll/delete', (req, res, next) => {

    const { id } = req.body
    Poll.findOne({ _id: id})
    .populate('createdBy')
    .exec((err, poll) => {
      if (err) return next(Error(err))
      if (!poll) return next(Error('Poll Not Found.'))
      if (req.user.username !== poll.createdBy.username) {
        return next(Error('Only the creater may delete a poll'))
      }

      Poll.remove({ _id: poll })
      .exec(err => {
        if (err) return next(Error('Error deleting poll'))

        res.type('json').send({
          success: true,
          poll: { title: poll.title }
        })
      })

    })
  })


  // Delete a single user
  app.post('/api/user/delete', (req, res, next) => {

    const { user } = req.body

    User.findOne({ username: user })
    .populate('polls')
    .exec((err, user) => {
      if (err) return next(Error(err))
      if (!user) return next(Error('User Not Found.'))
      if (req.user.username !== user.username) {
        return next(Error('You are not authorized to delete this account.'))
      }

      User.update({ _id: user._id }, { deleted: true }, (err, doc) => {
        if (err) return next(Error(err))
        req.logout()
        res.type('json').send({
          success: true,
          message: `Account '${user.username}' successfully deleted.`,
          user: user
        })
      })
    })
  })


  ///////////////////////////////////////////////////////////
  // User Authentication Verification
  ///////////////////////////////////////////////////////////
  app.get('/isauthenticated', (req, res) => {
    res.type('json').send({
      isAuthenticated: req.isAuthenticated(),
      user: req.user ? req.user.username : '',
      sessionID: req.sessionID
    })
  })


  ///////////////////////////////////////////////////////////
  // User Login and Create New Session
  ///////////////////////////////////////////////////////////
  app.post('/login', (req, res, next) => {

    console.log(`/login POST sessionID: ${req.sessionID}`)
    passport.authenticate('login', (err, user, info) => {

      const { message='' } = info ? info : {}
      if (err) return next(err)
      if (!user) {
        return res.type('json').send({
          message,
          success: false,
          username: user.username
        })
      }

      // Establish session with user
      req.login(user, err => {

        if (err) return next(err)
        console.log(`New session created for user ${user.username}`)
        res.type('json').send({
          message,
          success: true,
          username: user.username
        })
      })

    })(req, res, next)
  })


  ///////////////////////////////////////////////////////////
  // User Logout
  ///////////////////////////////////////////////////////////
  app.post('/logout', (req, res) => {
    const { username } = req.user
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.type('json').send({
        success: true,
        message: `User ${username} logged out.`
      })
      console.log(`User ${username} sessionID: ${req.sessionID} logged out.`)
    })
  })


  ///////////////////////////////////////////////////////////
  // User Registration, Login, and Create New Session
  ///////////////////////////////////////////////////////////
  app.post('/register', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
      
      const { message='' } = info ? info : {}
      if (err) return next(err)
      if (!user) {
        return res.type('json').send({
          message,
          success: false,
          username: user.username
        })
      }

      // Establish session with user
      req.login(user, err => {
        if (err) return next(err)
        console.log(`New session created for user ${user.username} sessionID: ${req.sessionID}`)
        res.type('json').send({
          message,
          success: true,
          username: user.username
        })
      })

    })(req, res, next)
  })


  ///////////////////////////////////////////////////////////
  // Handle New Poll Submission
  ///////////////////////////////////////////////////////////

  app.post('/submit_new_poll', [
    
    body('title')
      .trim()
      .isLength({ min: 4 })
      .withMessage('Title should be at least 4 characters')
      .isAscii()
      .withMessage('Title should include only valid ascii characters'),

    body('shortName')
      .trim()
      .isLength({ max: 16 })
      .withMessage('Short Name should be max 16 characters')
      .optional({checkFalsy: true}).isAscii()
      .withMessage('Short Name should include only valid ascii characters'),

    body('choices')
      .custom(array => Array.from(new Set(array)).length >= 2)
      .withMessage('Must include at least two unique choices'),

    body('choices.*')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Choices cannot be blank')
      .isAscii()
      .withMessage('Choices should include only valid ascii characters'),

    body('selectedChoiceIndex')
      .isInt()
      .withMessage('Selected choice should be integer value')
      .custom((val, { req }) => (
        +val >= 0 && +val < req.body.choices.length)
      )
      .withMessage('Selected choice not within the correct range'),

    sanitizeBody('title').trim(),
    sanitizeBody('shortName').trim(),
    sanitizeBody('choices.*').trim(),
    sanitizeBody('selectedChoiceIndex').toInt()

  ], (req, res, next) => {

    const errors = validationResult(req)
    const { title, shortName, choices, selectedChoiceIndex } = req.body
    const { sessionID } = req
    
    if (!errors.isEmpty()) {
      return next( Error(errors.array()[0].msg) )
    }

    if (!req.user) {
      return next( Error("Must be logged in to add new poll.") )
    }

    if (!Array.from(new Set(choices)).length >= 2) {
      return next ( Error('Must include at least 2 unique choices!') )
    }

    User.findOne({'_id': req.user._id}, (err, user) => {
      
      if (err) return next( Error(`User ${user} not found in database`) )
      

      const poll = new Poll({
        choices: choices.map((choice, i) => ({
          choice,
          votes: i === selectedChoiceIndex ? 1 : 0
        })),
        createdTime: Date.now(),
        createdBy: user._id,
        seedColor: Math.floor(Math.random() * 360),
        shortName: shortName || user.polls.length,
        title,
        voters: [{
          sessionID: sessionID,
          datevoted: Date.now()
        }]
      })

      poll.save(err => {

        if (err) return next(Error(err))
        User.findOneAndUpdate(
          { _id: user._id },
          { $push: { polls: poll._id }},
          err => err && next(Error(err))
        )

        res.type('json').send({
          success: true,
          message: `Successfully submitted new poll ${title}`,
          poll: {
            shortName: poll.shortName,
            user: user.username,
            title: poll.tile
          }
        })

      })

    })
  })


  ///////////////////////////////////////////////////////////
  // Handle Get Requests for Polls
  ///////////////////////////////////////////////////////////
  app.get('/polls', (req, res, next) => {

    console.log(`New Request for ${req.hostname + req.path}`)
    console.log(`query=${JSON.stringify(req.query)}`)
    const { skip=0, limit=0 } = req.query

    Poll.find()
      .skip(+skip)
      .limit(+limit)
      .populate('createdBy')
      .exec((err, polls) => {
        if (err) {
          return next( Error('Error retrieving polls from database') )
        }

        Poll.count({}, (err, count) => {
          res.type('json').send({ polls, count })
        })
        
    })
  })


  ///////////////////////////////////////////////////////////
  // Default Route Handler, Loads React App
  ///////////////////////////////////////////////////////////
  app.get('*', (req, res) => {
    console.log(`Default Route Handler for ${req.hostname + req.path}`)
    res.sendFile(path.join(public, 'index.html'))
  })


  ///////////////////////////////////////////////////////////
  // Error Handler
  ///////////////////////////////////////////////////////////
  app.use((err, req, res, next) => {
    const errmsg = err.message ? err.message : err

    console.log(`Error Middleware: ${errmsg}`)
    res.type('json').send({
      success: false,
      message: errmsg,
      error: err
    })
  })

}