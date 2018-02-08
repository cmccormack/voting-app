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
    polls: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Poll'
    }]
  })

  userSchema.methods.comparePasswords = function(password) {
    return bcrypt.compareSync(password, this.password)
  }

  return mongoose.model('User', userSchema, 'users')

}