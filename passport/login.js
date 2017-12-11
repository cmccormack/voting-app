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

        return user.comparePasswords(password, (err, isMatch) => {

          // Handle error when checking password hash
          if (err) return done(err)

          if (!isMatch) {
            return done(new Error('Invalid Password'))
          }

        })

      })
    }

  ))
}