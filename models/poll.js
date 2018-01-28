
module.exports = mongoose => {
  
  const pollSchema = new mongoose.Schema({
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createTime: {
      type: String,
      required: true
    },
    title: {
      type: String,
      unique: true,
      required: true
    },
    shortName: {
      type: String,
      unique: true,
      required: false
    },
    choices: [{
      index: Number,
      choice: String,
      votes: Number
    }],
    voters: [{
      votedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      datevoted: Date,
      choiceIndex: Number
    }]
  })

  return mongoose.model('Poll', pollSchema, 'polls')

}