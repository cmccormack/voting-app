
module.exports = mongoose => {
  
  const PollSchema = new mongoose.Schema({
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdTime: {
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
      required: true
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

  var Poll = mongoose.model('Poll', PollSchema, 'polls')
  PollSchema.pre('validate', function(next) {
    console.log(`presave - ${this}`)
  })

  
  // PollSchema.pre('validate', function(next) {
  //   console.log('****** Inside PollSchema pre ******')
  //   console.log(`Poll presave: ${this}`)
  //   Poll.find({createdBy: this.createdBy, title: this.title}, (err, docs) => {
  //     if (docs) {
  //       return next( new Error('Poll with that title already exists!') )
  //     } else {
  //       return next()
  //     }
  //   })
  // })

  Poll = mongoose.model('Poll', PollSchema, 'polls')
  return Poll

}