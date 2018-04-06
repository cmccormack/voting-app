const bcrypt = require('bcrypt')

module.exports = mongoose => {
  
  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    dateCreated: {
      type: Date,
      required: true,
    },
    locked: {
      type: Boolean,
    },
    deleted: {
      type: Boolean,
    },
    polls: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Poll'
    }],
  })

  userSchema.methods.comparePasswords = function(password) {
    return bcrypt.compareSync(password, this.password)
  }

  userSchema.statics.getUsers = function() {
    return new Promise((resolve, reject) => {
      this.find((err, docs) => {
        if (err) return reject(err)
        resolve(docs)
      })
    })
  }

  return mongoose.model('User', userSchema, 'users')

}