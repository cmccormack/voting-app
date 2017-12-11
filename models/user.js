const bcrypt = require('bcrypt')

module.exports = mongoose => {
  
  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
  })

  userSchema.methods.comparePasswords = function(password, callback) {
    bcrypt.compare(this.password, password, callback)
  }

  return mongoose.model('User', userSchema, 'users')

}