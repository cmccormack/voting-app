const path = require('path')
const User = require('../models/user')

module.exports = (app, passport) => {

  const root = path.resolve(__dirname, '..')
  const public = path.join(root, 'public')

  app.use((req, res, next) => {
    const { user, sessionID } = req
    console.log(`user: ${user ? user.username : 'null'}, ` +
      `sessionID: ${sessionID ? sessionID : 'null'}, ` +
      `isAuthenticated: ${user ? req.isAuthenticated() : 'null'}`)
    next()
  })

  ///////////////////////////////////////////////////////////
  // Test API is Availability
  ///////////////////////////////////////////////////////////
  app.get('/api_test', (req, res) => {
    res.type('json').send(JSON.stringify(
      {
        'result': 'success'
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
  app.post('/submit_new_poll', (req, res) => {
    console.log(req.user.username)
    console.log(req.body)
    const { title, shortName, choices } = req.body
    const response = {
      success: false,
      message: ''
    }
    // Validate poll fields
    if (!title) {
      response.message = "Title cannot be blank"
    } 
    else if (choices.includes('')){
      response.message = "Choices cannot be blank"
    } else {
      response.success = true
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