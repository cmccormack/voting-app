const path = require('path')
const User = require('../models/user')

module.exports = (app, passport) => {

  const root = path.resolve(__dirname, '..')
  const public = path.join(root, 'public')

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
    console.log('GET request to /isauthenticated')
    console.log(req.session)
    res.type('json').send({isAuthenticated: req.isAuthenticated()})
  })


  ///////////////////////////////////////////////////////////
  // User Login and Create New Session
  ///////////////////////////////////////////////////////////
  app.post('/login', (req, res, next) => {
    console.log('POST request to /login')
    passport.authenticate('login', (err, user, info) => {

      if (err) return next(err)
      if (!user) {
        return res.type('json').send({
          success: false,
          message: info.message,
          username: user.username
        })
      }

      // Establish session with user
      req.login(user, err => {
        if (err) return next(err)
        console.log(`New session created for user ${user.username}`)
        res.type('json').send({
          success: true,
          message: info.message,
          username: user.username
        })
      })

    })(req, res, next)
  })


  ///////////////////////////////////////////////////////////
  // User Logout
  ///////////////////////////////////////////////////////////
  app.get('/logout', (req, res) => {
    console.log('GET request to /logout')
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

      if (err) return next(err)
      if (!user) {
        return res.type('json').send({
          success: false,
          message: info.message,
          username: user.username
        })
      }

      // Establish session with user
      req.login(user, err => {
        if (err) return next(err)
        console.log(`New session created for user ${user.username}`)
        res.type('json').send({
          success: true,
          message: info.message,
          username: user.username
        })
      })

    })(req, res, next)
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
    console.log('Error Handler Route')
    console.log(err)
  })

}