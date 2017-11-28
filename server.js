///////////////////////////////////////////////////////////
//  Import modules
///////////////////////////////////////////////////////////
const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config({path: path.resolve(__dirname, '.env')})


///////////////////////////////////////////////////////////
//  Configure and connect to MongoDB database
///////////////////////////////////////////////////////////
const dbconf = require('./db.js')
mongoose.Promise = global.Promise
mongoose.connect(dbconf.url, dbconf.options)
  .then(
    () => { console.log(`Successfully connected to database [${dbconf.db}]`) },
    err => { }
  )

const db = mongoose.connection
db.on('error', err => { console.error(`${err.name}: ${err.message}`) })


///////////////////////////////////////////////////////////
//  Initialize Express and configure Middleware
///////////////////////////////////////////////////////////
const app = express()
const port = process.env.PORT || 3000

// Serve static files
app.use(express.static(path.join(__dirname, 'public')))

// Body parsing - parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Body parsing - parse json
app.use(bodyParser.json())

// Handle cross-site request
app.use(cors())

// Import Express Routes and call with Express app
const routes = require('./app/routes.js')
routes(app)


///////////////////////////////////////////////////////////
//  Start Express Server
///////////////////////////////////////////////////////////
const server = app.listen(port, () => {
  const {port, address} = server.address()
  console.log(`Express server started on ${address}:${port}`)
})