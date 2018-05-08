
module.exports = mongoose => {
  
  const PollSchema = new mongoose.Schema({
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdTime: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: true,
    },
    choices: [{
      index: Number,
      choice: String,
      votes: Number,
    },],
    voters: [{
      sessionID: String,
      datevoted: Date,
    },],
    seedColor: Number,
    totalVotes: Number,
  })

  PollSchema.statics.getPolls = function() {
    return new Promise((resolve, reject) => {
      this.find((err, docs) => {
        if (err) return reject(err)
        resolve(docs)
      })
    })
  }

  PollSchema.pre('save', function(next) {
    Poll.find({})
      .where('createdBy').equals(this.createdBy)
      .or([ { title: this.title, }, { shortName: this.shortName, }, ])
      .exec((err, docs) => {
        if (docs.length > 0) {
          if (this.title === docs[0].title) {
            return next( Error('Poll with that title already exists!') )
          } else {
            return next( Error('Poll with that short name already exists!') )
          }
        }
        return next()
      })
  })

  const Poll = mongoose.model('Poll', PollSchema, 'polls')
  return Poll

}