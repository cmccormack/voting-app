const path = require('path')
const { body, validationResult, } = require('express-validator/check')
const { sanitizeBody, } = require('express-validator/filter')

module.exports = (app, passport, models) => {

  const root = path.resolve(__dirname, '..')
  const publicPath = path.join(root, 'public')

  const { User, Poll, } = models

  ///////////////////////////////////////////////////////////
  // Testing/Debug Middleware
  ///////////////////////////////////////////////////////////
  app.use((req, res, next) => {
    const { user = { username: null, }, } = req
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

  require('./polls.js')(app, models)
  require('./users.js')(app, models, passport)




















  ///////////////////////////////////////////////////////////
  // Handle New Poll Submission
  ///////////////////////////////////////////////////////////

  app.post('/submit_new_poll', [
    
    body('title')
      .trim()
      .isLength({ min: 4, })
      .withMessage('Title should be at least 4 characters')
      .isAscii()
      .withMessage('Title should include only valid ascii characters'),

    body('shortName')
      .trim()
      .isLength({ max: 16, })
      .withMessage('Short Name should be max 16 characters')
      .optional({checkFalsy: true,}).isAscii()
      .withMessage('Short Name should include only valid ascii characters'),

    body('choices')
      .custom(array => Array.from(new Set(array)).length >= 2)
      .withMessage('Must include at least two unique choices'),

    body('choices.*')
      .trim()
      .isLength({ min: 1, })
      .withMessage('Choices cannot be blank')
      .isAscii()
      .withMessage('Choices should include only valid ascii characters'),

    body('selectedChoiceIndex')
      .isInt()
      .withMessage('Selected choice should be integer value')
      .custom((val, { req, }) => (
        +val >= 0 && +val < req.body.choices.length)
      )
      .withMessage('Selected choice not within the correct range'),

    sanitizeBody('title').trim(),
    sanitizeBody('shortName').trim(),
    sanitizeBody('choices.*').trim(),
    sanitizeBody('selectedChoiceIndex').toInt(),

  ], (req, res, next) => {

    const errors = validationResult(req)
    const { title, shortName, choices, selectedChoiceIndex, } = req.body
    const { sessionID, } = req
    
    if (!errors.isEmpty()) {
      return next( Error(errors.array()[0].msg) )
    }

    if (!req.user) {
      return next( Error("Must be logged in to add new poll.") )
    }

    if (!Array.from(new Set(choices)).length >= 2) {
      return next ( Error('Must include at least 2 unique choices!') )
    }

    User.findOne({'_id': req.user._id,}, (err, user) => {
      
      if (err) return next( Error(`User ${user} not found in database`) )
      

      const poll = new Poll({
        choices: choices.map((choice, i) => ({
          choice,
          votes: i === selectedChoiceIndex ? 1 : 0,
        })),
        createdTime: Date.now(),
        createdBy: user._id,
        seedColor: Math.floor(Math.random() * 360),
        shortName: shortName || user.polls.length,
        title,
        voters: [{
          sessionID: sessionID,
          datevoted: Date.now(),
        },],
      })

      poll.save(err => {

        if (err) return next(Error(err))
        User.findOneAndUpdate(
          { _id: user._id, },
          { $push: { polls: poll._id, },},
          err => err && next(Error(err))
        )

        res.type('json').send({
          success: true,
          message: `Successfully submitted new poll ${title}`,
          poll: {
            shortName: poll.shortName,
            user: user.username,
            title: poll.title,
          },
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
    const { skip=0, limit=0, } = req.query

    Poll.find()
      .skip(+skip)
      .limit(+limit)
      .populate('createdBy', 'username')
      .exec((err, polls) => {
        if (err) {
          return next( Error('Error retrieving polls from database') )
        }

        Poll.count({}, (err, count) => {
          res.type('json').send({ polls, count, })
        })
        
    })
  })


  ///////////////////////////////////////////////////////////
  // Default Route Handler, Loads React App
  ///////////////////////////////////////////////////////////
  app.get('*', (req, res) => {
    console.log(`Default Route Handler for ${req.hostname + req.path}`)
    res.sendFile(path.join(publicPath, 'index.html'))
  })


  ///////////////////////////////////////////////////////////
  // Error Handler
  ///////////////////////////////////////////////////////////
  app.use((err, req, res) => {
    const errmsg = err.message ? err.message : err

    console.log(`Error Middleware: ${errmsg}`)
    res.type('json').send({
      success: false,
      message: errmsg,
      error: err,
    })
  })

}