
module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('<h1>Hello, World!</h1>')
  })

  app.get('/api_test', (req, res) => {
    res.type('json').send(JSON.stringify(
      {
        'result': 'success'
      }
    ))
  })
}