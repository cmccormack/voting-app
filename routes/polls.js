module.exports = (app, {User, Poll,}) => {

  require('./pollvote')(app, Poll)

  // Get all Polls
  app.get('/api/polls', (req, res, next) => {

    Poll.getPolls()
    .then(docs => {
      res.type('json').send(docs)
    })
    .catch(next)
  })

  // Get all polls of a single user
  app.get('/api/:user/polls', (req, res, next) => {

    User
    .findOne({ username: req.params.user, })
    .populate('polls')
    .exec((err, user) => {
      if (err) return next(Error(err))

      res.type('json').send({
        success: true,
        message: '',
        polls: user ? user.polls : [],
      })
    })
  })


  // Get a single poll for a single user
  app.get('/api/:user/polls/:poll', (req, res, next) => {

    const { user, poll, } = req.params

    User.findOne({ username: user, })
    .exec((err, user) => {
    if (err) return next(Error(err))
    if (!user) return next(Error('User Not Found.'))

      Poll.findOne({ shortName: poll, createdBy: user._id, })
      .exec((err, poll) => {
        if (err) return next(Error(err))
        if (!poll) return next(Error('Poll Not Found.'))
        res.type('json').send({
          success: true,
          poll: poll,
          username: user.username,
        })
      })
    })
  })

  // Delete a single poll for a single user
  app.post('/api/poll/delete', (req, res, next) => {

    const { id, } = req.body
    Poll.findOne({ _id: id, })
    .populate('createdBy', 'username')
    .exec((err, poll) => {
      if (err) return next(Error(err))
      if (!poll) return next(Error('Poll Not Found.'))

      // Remove all but username from createdBy object
      poll.createdBy = { 'username': poll.createdBy.username, }

      if (req.user.username !== poll.createdBy.username) {
        return next(Error('Only the creater may delete a poll'))
      }

      Poll.remove({ _id: poll, })
      .exec(err => {
        if (err) return next(Error('Error deleting poll'))

        res.type('json').send({
          success: true,
          poll: { title: poll.title, },
        })
      })
    })
  })


}