const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

module.exports = (passport, models) => {
  const User = models.User

  const saltRounds = 10
  const hashPassword = plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, saltRounds)
  }

  passport.use('register', new LocalStrategy({
    session: true,
    passReqToCallback: true,
  },
    (req, username, password, done) => {
      
      // Cleanup extraneous whitespace from inputs
      username = username.trim()
      password = password.trim()

      User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i'), }, }, (err, user) => {
        
        // Handle error when querying user
        if (err) return done(err)

        // Return early if user already exists in database
        if (user) { 
          console.error(`Register: Username ${username} already exists`)
          return done(null, false, {message: 'Username already in use.', })
        }
        
        // Create new user
        console.info(`Mongoose: User [${username}] not found in db, adding...`)
        const newUser = new User({
          username: username,
          password: hashPassword(password),
          polls: [],
          locked: false,
          deleted: false,
          dateCreated: new Date(),
        })

        // Save new user to database
        newUser.save(err => {
          if (err) {
            console.error(`Mongoose error writing user to database: ${err}`)
            return done(err)
          }
          console.info(`User ${newUser.username} added to database!`)
          return done(null, newUser, {
            message: `User ${username} added to database!`,
          })
        })
      
      })
    }))
}