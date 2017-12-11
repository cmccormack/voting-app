const signup = require('./register')
const login = require('./login')

module.exports = (mongoose, passport) => {

  const models = {
    User: require('../models/user')(mongoose)
  }

  const User = models.User

  // Debug
  User.find({}, {username: 1, password:1, _id: 0}, (err, doc) => {
    console.log(doc)
  })

  passport.serializeUser((user, done) => {
    console.log(`Serializing user: ${user.username}`);
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    console.log(`Deserializing id: ${id}`);
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  signup(passport, models)
  login(passport, models)

}