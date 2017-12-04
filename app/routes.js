const path = require('path')
const User = require('../models/user')

module.exports = (app, passport) => {

  const root = path.resolve(__dirname, '..')
  const public = path.join(root, 'public')


  app.get('/api_test', (req, res) => {
    res.type('json').send(JSON.stringify(
      {
        'result': 'success'
      }
    ))
  })
  
  app.post('/login', (req, res) => {
    res.type('json').send(JSON.stringify(
      {
        'username': req.body.username,
        'password': req.body.password
      }
    ))
  })

  app.post('/register', (req, res, next) => {

    passport.authenticate('signup', (err, user, info) => {

      if (err) return next(err)
      if (!user) {
        return res.type('json').send({
          success: false,
          message: info.message
        })
      }

      // Establish session with user
      req.login(user, err => {
        if (err) return next(err)
        console.log(`New session created for user ${user.username}`)
        res.type('json').send({
          success: true,
          message: info.message
        })
      })

    })(req, res, next)
  })

  // Handle invalid routes that React Router cannot
  app.get('/:path/*', (req, res) => {
    console.log(`New Request for ${req.hostname + req.path}`)
    res.redirect('/')
  })

  // Default route loads React app
  app.get('*', (req, res) => {
    console.log(`New Request for ${req.hostname + req.path}`)
    res.sendFile(path.join(public, 'index.html'))
  })

}