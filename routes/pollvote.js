const { body, validationResult, } = require('express-validator/check')
const { sanitizeBody, } = require('express-validator/filter')

module.exports = (app, Poll) => {

  // Vote on a single poll
  app.post('/api/:user/polls/:poll',
  [
    body('selectedChoice')
    .trim()
    .isLength({ min: 1, })
    .withMessage('New choice should be at least 1 character.')
    .isLength({ max: 32, })
    .withMessage('New choice should be at most 32 characters.')
    .isAscii()
    .withMessage('New choice should include only valid ascii characters'),

    sanitizeBody('selectedChoice').trim(),
  ],
  (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const { param, msg: message, } = errors.array()[0]
      return next({ param, message, })
    }

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
    .find({ 'shortName': params.poll, })
    .populate('createdBy', 'username')
    .exec((err, polls) => {

      const poll = polls.filter(
        poll=> poll.createdBy.username === params.user
      )[0]

      if (err) return next(Error(err))
      if (!poll) return next(Error('Invalid Poll Short Name'))

      console.log(poll.createdBy.username, params.user)
      if (poll.createdBy.username !== params.user) {
        return next(Error('Invalid Poll Short Name or User'))
      }

      // Filter all but recent voters based on expiry time
      const recentVoters = poll.voters.filter(v => {
        return Date.now() - v.datevoted < expiry
      })
      const voterIds = recentVoters.map(({ sessionID, }) => sessionID)
      const voterIndex = voterIds.indexOf(req.sessionID)

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
      if (choiceIndex !== -1) {
        choices[choiceIndex].votes += 1
      } else {
        if (req.user) {
          choices.push({ choice: selectedChoice, votes: 1, })
        } else {
          return next(Error('Must be logged in to add a new choice'))
        }
      }

      // Update Poll
      Poll.findByIdAndUpdate(
        poll._id,
        {
          $set: {
            'choices': choices,
            'voters': recentVoters,
          },
          $inc: {
            totalVotes: 1,
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