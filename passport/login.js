const Strategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = (mongoose, passport) => {

  passport.use(new Strategy((username, password, done) => {


  }))
}