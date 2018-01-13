
module.exports = mongoose => {
  
  const pollSchema = new mongoose.Schema({
    createTime: {
      type: String,
      required: true
    },
    title: {
      type: String,
      unique: true,
      required: true
    },
    choices: [{
      choice: String,
      votes: Number
    }],
  })

  return mongoose.model('Poll', pollSchema, 'polls')

}