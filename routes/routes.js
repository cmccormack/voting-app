const path = require('path')


module.exports = (app, passport, models) => {

  const root = path.resolve(__dirname, '..')
  const publicPath = path.join(root, 'public')

  const { User, Poll, } = models

  ///////////////////////////////////////////////////////////
  // Testing/Debug Middleware
  ///////////////////////////////////////////////////////////
  app.use((req, res, next) => {
    const { user = { username: null, }, } = req
    console.debug(`DEBUG user: ${user.username} sessionID: ${req.sessionID}`)
    next()
  })


  ///////////////////////////////////////////////////////////
  // Import user and poll routes
  ///////////////////////////////////////////////////////////
  require('./polls.js')(app, models)
  require('./users.js')(app, models, passport)


  ///////////////////////////////////////////////////////////
  // Default Route Handler, Loads React App
  ///////////////////////////////////////////////////////////
  app.get('*', (req, res) => {
    console.info(`Default Route Handler for ${req.hostname + req.path}`)
    res.sendFile(path.join(publicPath, 'index.html'))
  })


  ///////////////////////////////////////////////////////////
  // Error Handler
  ///////////////////////////////////////////////////////////
  /* eslint no-unused-vars: 0 */
  app.use((err, req, res, next) => {

    const errmsg = (err.message ? err.message : err).replace('Error: ', '')

    console.error(`Error Middleware: ${errmsg}`)
    res.type('json').send({
      success: false,
      message: errmsg,
      error: err,
    })
  })

}