const signup = require('./signup')
const login = require('./login')
const User = require('../models/user')

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      done(err, user);
    })
  })

  signup(passport)
  login(passport)

}