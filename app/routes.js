const path = require('path')
const Poll = require('../models/poll')
const { body, validationResult } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')

module.exports = (app, passport, models) => {

  const root = path.resolve(__dirname, '..')
  const public = path.join(root, 'public')

  const { User, Poll } = models

  // Testing


  Poll.find({}, (err, doc) => {
    console.log(doc)
  })

  User.findOne({'username': 'chris'}, (err, user) => {
    console.log(user)
    const poll = new Poll({
      createdBy: user._id,
      title: 'Test Poll 3',
      shortName: 'Test_Poll_3',
      createTime: Date.now()
    })

    poll.save( err => {
      if (err) console.log(err.message)
    })
  })

  // End Testing

  ///////////////////////////////////////////////////////////
  // Testing/Debug Middleware, DELETE LATER
  ///////////////////////////////////////////////////////////
  app.use((req, res, next) => {
    const { user, sessionID } = req
    console.log(`user: ${user ? user.username : 'null'}, ` +
      `sessionID: ${sessionID ? sessionID : 'null'}, ` +
      `isAuthenticated: ${user ? req.isAuthenticated() : 'null'}`)
    next()
  })

  ///////////////////////////////////////////////////////////
  // Test API is Availabile
  ///////////////////////////////////////////////////////////
  app.get('/api_test', (req, res) => {
    res.type('json').send(JSON.stringify(
      {
        'apiAvailable': 'success'
      }
    ))
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
    req.logout()
    res.type('json').send({
      success: true,
      message: `User ${username} logged out.`
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
      .optional({checkFalsy: true}).isAscii()
      .withMessage('Short Name should include only valid ascii characters'),

    body('choices')
      .custom(array => array.length >= 2)
      .withMessage('Must include at least two choices'),

    body('choices.*')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Choices cannot be blank')
      .isAscii()
      .withMessage('Choices should include only valid ascii characters'),

    sanitize('title').trim(),
    sanitize('shortName').trim(),
    sanitize('choices.*').trim(),

  ], (req, res) => {
    console.log(req.body)
    const errors = validationResult(req)
    
    const response = {
      success: errors.isEmpty(),
      message: !errors.isEmpty() ? errors.array()[0].msg : ''
    }

    res.type('json').send(response)

  })


  ///////////////////////////////////////////////////////////
  // Handle Invalid Routes that React Router Does Not
  ///////////////////////////////////////////////////////////
  app.get('/:path/*', (req, res) => {
    console.log(`New Request for ${req.hostname + req.path}`)
    res.redirect('/')
  })


  ///////////////////////////////////////////////////////////
  // Default Route Handler, Loads React App
  ///////////////////////////////////////////////////////////
  app.get('*', (req, res) => {
    console.log(`New Request for ${req.hostname + req.path}`)
    res.sendFile(path.join(public, 'index.html'))
  })


  ///////////////////////////////////////////////////////////
  // Error Handler
  ///////////////////////////////////////////////////////////
  app.use((err, req, res, next) => {
    console.log(`Error Handler Middleware: ${err.message}`)
  })

}