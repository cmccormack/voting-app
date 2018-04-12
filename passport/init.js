const register = require('./register')
const login = require('./login')

module.exports = (passport, models) => {

  const User = models.User

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  register(passport, models)
  login(passport, models)
}