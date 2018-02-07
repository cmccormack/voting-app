
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

  PollSchema.pre('save', function(next) {

    Poll.find({})
      .where('createdBy').equals(this.createdBy)
      .or([ { title: this.title }, { shortName: this.shortName } ])
      .exec((err, docs) => {
        console.log(err)
        console.log(docs)
        if (docs.length > 0) {
          return next( new Error('Poll with that title already exists!') )
        } else {
          return next()
        }
      })
  })

  const Poll = mongoose.model('Poll', PollSchema, 'polls')

  return Poll

}