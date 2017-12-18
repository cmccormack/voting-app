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

      User.findOne({ username }, (err, user) => {

        // Handle error when querying user
        if (err) return done(err)

        if (!user) {
          return done(null, false, {message: 'Username not found.'})
        }

        const isMatch = user.comparePasswords(password)

        if (!isMatch) {
          return done(null, false, {
            message: 'Invalid Password'
          })
        }

        return done(null, user)

      })
    }

  ))
}