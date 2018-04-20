const LocalStrategy = require('passport-local').Strategy

module.exports = (passport, models) => {
  const User = models.User

  passport.use('login', new LocalStrategy({
    session: true,
    passReqToCallback: true
  },
    (req, username, password, done) => {

      // Cleanup extraneous whitespace from inputs
      username = username.trim()
      password = password.trim()

      // Case insensitive username lookup
      User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i')} }, (err, user) => {

        // Handle error when querying user
        if (err) return done(err)

        if (!user) {
          return done(null, false, {message: 'Username not found.'})
        }

        if (user.deleted) {
          return done(null, false, {message: 'Account was deleted by creator.'})
        }

        const isMatch = user.comparePasswords(password)

        if (!isMatch) {
          return done(null, false, {
            message: 'Incorrect Password'
          })
        }

        req.session.regenerate(err => {
          if (err) return done(err)
          return done(null, user)
        })
      })
    }

  ))
}