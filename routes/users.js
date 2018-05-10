const passport = require('passport')

module.exports = (app, {User, }) => {


  ///////////////////////////////////////////////////////////
  // Get all Users
  ///////////////////////////////////////////////////////////
  app.get('/api/users', (req, res, next) => {
    User.getUsers()
      .then(docs => {
        res.type('json').send(docs.map(doc => {
          delete doc.password
          delete doc['__v']
          return doc
        }))
      })
      .catch(next)
  })

  ///////////////////////////////////////////////////////////
  // User Authentication Verification
  ///////////////////////////////////////////////////////////
  app.get('/isauthenticated', (req, res) => {
    res.type('json').send({
      isAuthenticated: req.isAuthenticated(),
      user: req.user ? req.user.username : '',
      sessionID: req.sessionID,
    })
  })


  ///////////////////////////////////////////////////////////
  // User Registration, Login, and Create New Session
  ///////////////////////////////////////////////////////////
  app.post('/register', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {

      const { message = '', } = info ? info : {}
      if (err) return next(err)
      if (!user) {
        return res.type('json').send({
          message,
          success: false,
          username: user.username,
        })
      }

      // Establish session with user
      req.login(user, err => {
        if (err) return next(err)
        console.info(`New session created for user ${user.username} sessionID: ${req.sessionID}`)
        res.type('json').send({
          message,
          success: true,
          username: user.username,
        })
      })

    })(req, res, next)
  })


  ///////////////////////////////////////////////////////////
  // User Login and Create New Session
  ///////////////////////////////////////////////////////////
  app.post('/login', (req, res, next) => {

    console.info(`/login POST sessionID: ${req.sessionID}`)
    passport.authenticate('login', (err, user, info) => {

      const { message = '', } = info ? info : {}
      if (err) return next(err)
      if (!user) {
        return res.type('json').send({
          message,
          success: false,
          username: user.username,
        })
      }

      // Establish session with user
      req.login(user, err => {

        if (err) return next(err)
        console.info(`New session created for user ${user.username}`)
        res.type('json').send({
          message,
          success: true,
          username: user.username,
        })
      })

    })(req, res, next)
  })


  ///////////////////////////////////////////////////////////
  // User Logout
  ///////////////////////////////////////////////////////////
  app.post('/logout', (req, res) => {
    const { username, } = req.user
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.type('json').send({
        success: true,
        message: `User ${username} logged out.`,
      })
      console.info(`User ${username} sessionID: ${req.sessionID} logged out.`)
    })
  })


  ///////////////////////////////////////////////////////////
  // Delete a single user
  ///////////////////////////////////////////////////////////
  app.post('/api/user/delete', (req, res, next) => {

    const { user, } = req.body

    User.findOne({ username: user, })
    .exec((err, user) => {
      if (err) return next(Error(err))
      if (!user) return next(Error('User Not Found.'))

      const { username, } = user
      if (req.user.username !== username) {
        return next(Error('You are not authorized to delete this account.'))
      }

      User.update({ _id: user._id, }, { deleted: true, }, err => {
        if (err) return next(Error(err))
        req.logout()
        res.type('json').send({
          success: true,
          message: `Account '${username}' successfully deleted.`,
          user: { username, },
        })
      })
    })
  })

}