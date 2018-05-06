module.exports = (app, Poll) => {

  // Vote on a single poll
  app.post('/api/:user/polls/:poll', (req, res, next) => {
    const { body, params, sessionID, } = req
    const { selectedChoice, } = body
    const expiry = 60 * 1000 // 60 seconds

    const updateComplete = (err, doc, timeRemaining = expiry) => {

      res.type('json').send({
        success: !err,
        poll: doc,
        error: {
          message: err ? `Time Remaining: ${timeRemaining}ms`: 'No Error',
          timeRemaining,
        },
      })
    }

    Poll
    .findOne({ 'shortName': params.poll, })
    .populate('createdBy', 'username')
    .exec((err, poll) => {

      if (err) return next(Error(err))
      if (!poll) return next(Error('Invalid Poll Short Name'))

      if (poll.createdBy.username !== params.user) {
        return next(Error('Invalid Poll Short Name or User'))
      }

      // Filter all but recent voters based on expiry time
      const recentVoters = poll.voters.filter(v => {
        return Date.now() - v.datevoted < expiry
      })
      const voterIds = recentVoters.map(({ sessionID, }) => sessionID)
      const voterIndex = voterIds.indexOf(req.sessionID)

      console.log(voterIndex)
      if (voterIndex !== -1) {
        const timeRemaining = Math.floor(
          (expiry - (Date.now() - poll.voters[voterIndex].datevoted))
        )
        return updateComplete(true, poll, timeRemaining)

      } else {
        recentVoters.push({
          sessionID: sessionID,
          datevoted: Date.now(),
        })
      }

      // Clone poll choices
      const choices = JSON.parse(JSON.stringify(poll.choices))

      // Add new choice if doesn't exist else increment choice
      const choicesNames = choices.map(({ choice, }) => choice)
      const choiceIndex = choicesNames.indexOf(selectedChoice)
      if (~choiceIndex) {
        choices[choiceIndex].votes += 1
      } else {
        choices.push({ choice: selectedChoice, votes: 1, })
      }

      // Update Poll
      Poll.findByIdAndUpdate(
        poll._id,
        {
          $set: {
            'choices': choices,
            'voters': recentVoters,
          },
        },
        { new: true, },
      )
      .exec((err, doc) => {
        if (err) return next(Error(err))
        if (!doc) return next(Error('Poll Not Found!'))

        updateComplete(false, doc)
      })
    })
  })
}