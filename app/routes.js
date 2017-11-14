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
        'username': req.params.username,
        'password': req.params.password
      }
    ))
  })

  app.get('*', (req, res) => {
    console.log(`New Request for ${req.hostname + req.path}`)
    res.sendFile(path.join(static, 'index.html'))
  })

}