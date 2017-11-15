const path = require('path')


module.exports = (app) => {

  const root = path.resolve(__dirname, '..')
  const static = path.join(root, 'static')


  app.get('/api_test', (req, res) => {
    res.type('json').send(JSON.stringify(
      {
        'result': 'success'
      }
    ))
  })
  
  app.post('/login', (req, res) => {
    res.type('json').send(JSON.stringify(
      {
        'username': req.body.username,
        'password': req.body.password
      }
    ))
  })

  // Handle invalid routes that React Router cannot
  app.get('/:path/*', (req, res) => {
    console.log(`New Request for ${req.hostname + req.path}`)
    res.redirect('/')
  })

  // Default route loads React app
  app.get('*', (req, res) => {
    console.log(`New Request for ${req.hostname + req.path}`)
    res.sendFile(path.join(static, 'index.html'))
  })

}