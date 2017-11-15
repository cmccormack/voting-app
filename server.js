// Import Modules
const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

// Import Express Routes
const routes = require('./app/routes.js')

const app = express()
const port = process.env.PORT || 3000

// Serve static files middleware
app.use(express.static(path.join(__dirname, 'static')))

// Body parsing middleware - parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Handle cross-site request middleware
app.use(cors())

// Call route handler with Express app
routes(app)

// Start Express server
const server = app.listen(port, () => {
  const {port, address} = server.address()
  console.log(`Express server started on ${address}:${port}`)
})