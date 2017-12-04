const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

module.exports = (passport, models) => {
  const User = models.User

  const saltRounds = 10
  const hashPassword = plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, saltRounds)
  }


  passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },
  (req, username, password, done) => {

    User.findOne({username}, (err, user)=>{
      // Handle Error
      if (err) return done(err)

      // Return early if user already exists in database
      if (user) { 
        console.log(`Register: Username ${username} already exists`)
        return done(null, false, {message: 'Username already exists.'})
      }
      
      // Create new user and save to database
      console.log(`Mongoose: User [${username}] not found in db, adding...`)
      const newUser = new User({
        username: username,
        password: hashPassword(password)
      })

      newUser.save(err => {
        if (err) {
          console.error(`Mongoose error writing user to database: ${err}`)
          return done(err)
        }
        console.log(`User ${username} added to database!`)
        return done(null, newUser, {
          message: `User ${username} added to database!`
        })
      })
    
    })



  }))


}