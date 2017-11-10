const app = require('express')()
const cors = require('cors')

const routes = require('./app/routes.js')

const port = process.env.PORT || 3000


app.use(cors())

routes(app)

const server = app.listen(port, () => {
  const {port, address} = server.address()
  console.log(`Express server started on ${address}:${port}`)
})