
module.exports = mongoose => {
  
  const pollSchema = new mongoose.Schema({
    title: {
      type: String,
      unique: true,
      required: true
    },
    choices: {
      type: Array,
      required: true
    },
  })

  return mongoose.model('Poll', pollSchema, 'polls')

}