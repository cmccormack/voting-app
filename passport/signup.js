const Strategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = (passport) => {

  passport.use(new Strategy((username, password, done) => {


  }))
}