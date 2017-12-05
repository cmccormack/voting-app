
module.exports = mongoose => {
  
  const userSchema = mongoose.Schema({
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

  return mongoose.model('User', userSchema, 'users')

}