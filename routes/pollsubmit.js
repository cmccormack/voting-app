const { body, validationResult, } = require('express-validator/check')
const { sanitizeBody, } = require('express-validator/filter')

module.exports = (app, { User, Poll, }) => {

  ///////////////////////////////////////////////////////////
  // Handle New Poll Submission
  ///////////////////////////////////////////////////////////
  app.post('/submit_new_poll', [

    body('title')
      .trim()
      .isLength({ min: 3, })
      .withMessage('Title should be at least 4 characters')
      .isAscii()
      .withMessage('Title should include only valid ascii characters'),

    body('shortName')
      .trim()
      .isLength({ max: 16, })
      .withMessage('Short Name should be max 16 characters')
      .optional({ checkFalsy: true, }).isAscii()
      .withMessage('Short Name should include only valid ascii characters'),

    body('choices')
      .custom(array => Array.from(new Set(array)).length >= 2)
      .withMessage('Must include at least two unique choices'),

    body('choices.*')
      .trim()
      .isLength({ min: 1, })
      .withMessage('Choices cannot be blank')
      .isAscii()
      .withMessage('Choices should include only valid ascii characters'),

    body('selectedChoiceIndex')
      .isInt()
      .withMessage('Selected choice should be integer value')
      .custom((val, { req, }) => (
        +val >= 0 && +val < req.body.choices.length)
      )
      .withMessage('Selected choice not within the correct range'),

    sanitizeBody('title').trim(),
    sanitizeBody('shortName').trim(),
    sanitizeBody('choices.*').trim(),
    sanitizeBody('selectedChoiceIndex').toInt(),

  ], (req, res, next) => {

    const errors = validationResult(req)
    const { title, shortName, choices, selectedChoiceIndex, } = req.body
    const { sessionID, } = req

    if (!errors.isEmpty()) {
      const { param, msg: message, } = errors.array()[0]
      return next({ param, message, })
    }

    if (!req.user) {
      return next(Error("Must be logged in to add new poll."))
    }

    if (!Array.from(new Set(choices)).length >= 2) {
      return next(Error('Must include at least 2 unique choices!'))
    }

    User.findOne({ '_id': req.user._id, }, (err, user) => {

      if (err) return next(Error(`User ${user} not found in database`))


      const poll = new Poll({
        choices: choices.map((choice, i) => ({
          choice,
          votes: i === selectedChoiceIndex ? 1 : 0,
        })),
        createdTime: Date.now(),
        createdBy: user._id,
        seedColor: Math.floor(Math.random() * 360),
        shortName: shortName || user.polls.length,
        title,
        voters: [{
          sessionID: sessionID,
          datevoted: Date.now(),
        },],
        totalVotes: 1,
      })

      poll.save(err => {

        if (err) return next(err)
        
        User.findOneAndUpdate(
          { _id: user._id, },
          { $push: { polls: poll._id, }, },
          err => err && next(err)
        )

        res.type('json').send({
          success: true,
          message: `Successfully submitted new poll ${title}`,
          poll: {
            shortName: poll.shortName,
            user: user.username,
            title: poll.title,
          },
        })

      })

    })
  })

}