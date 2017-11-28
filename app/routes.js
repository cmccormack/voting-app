const path = require('path')
const User = require('../models/user')

module.exports = (app) => {

  const root = path.resolve(__dirname, '..')
  const public = path.join(root, 'public')


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

  app.post('/register', (req, res) => {

    res.type('json').send({ 
      path: '/register',
      method: 'POST',
      status: 'Success',
      body: JSON.stringify(req.body)
    })
    // const testUser = new User({
    //   username: req.body.username,
    //   password: req.body.password
    // }).save(err => {
    //   if (err) {
    //     console.error(`${err.name}: ${err.message}`)
    //     res.send('Error Registering')
    //   }
      
    //   res.type('json').send(JSON.stringify(
    //     {
    //       'username': req.body.username,
    //       'password': req.body.password
    //     }
    //   ))
    
    // })

    // User.find({'username': testUser.username}, (err, res)=>{
    //   if (err) console.error(`${err.name}: ${err.message}`)
    //   console.log(res)
    // })


  })




  // Handle invalid routes that React Router cannot
  app.get('/:path/*', (req, res) => {
    console.log(`New Request for ${req.hostname + req.path}`)
    res.redirect('/')
  })

  // Default route loads React app
  app.get('*', (req, res) => {
    console.log(`New Request for ${req.hostname + req.path}`)
    res.sendFile(path.join(public, 'index.html'))
  })

}