///////////////////////////////////////////////////////////
//  Import modules
///////////////////////////////////////////////////////////
const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const logger = require('morgan')
const favicon = require('serve-favicon')
require('dotenv').config({path: path.resolve(__dirname, '.env')})

///////////////////////////////////////////////////////////
//  Configure and connect to MongoDB database
///////////////////////////////////////////////////////////
const dbconf = require('./db.js')
mongoose.Promise = global.Promise
mongoose.connect(dbconf.url, dbconf.options)


// USED TO UPDATE MODELS, DELETE LATER
// models.User.updateMany({}, { polls: [] }, (err, docs) => {
//   if (err) return console.error(err)
//   console.log(docs)
// })

function updateModel(model, update={}) {
  models[model].updateMany({}, update, (err, docs) => {
    if (err) return console.error(err)
    console.log(docs)
  })
}

// Delete all polls, invoked when db connection opened
function wipePolls() {
  models.User.updateMany({}, { polls: [] }, (err, docs) => {
    if (err) return console.error(err)
  })
  db.dropCollection('polls')
}

// Delete a user, invoked when db connection opened
function wipeUser(username) {
  models.User.findOneAndRemove({ username }, (err) => {
    if (err) console.error(err)
  })
}

// Delete all users, invoked when db connection opened
function wipeUsers() {
  db.dropCollection('users')
}


// The connection used by default for every model created using mongoose.model
const db = mongoose.connection
db.on('error', err => {
  console.error(`Mongoose default connection error: ${err}`) 
})
db.once('open', () => {
  // wipeUsers()
  // wipePolls()
  // wipeUser('tara')
  // updateModel('User', { polls: [] })
  console.log(`Mongoose default connection opened [${dbconf.db}]`)
})

const models = {
  User: require('./models/user')(mongoose),
  Poll: require('./models/poll')(mongoose)
}

///////////////////////////////////////////////////////////
//  Initialize Express and configure Middleware
///////////////////////////////////////////////////////////
const app = express()
app.set('port', process.env.PORT || 3000)

// Serve static files
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.resolve(__dirname, 'public', 'images', 'favicon.ico')))

// Body parsing - parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Body parsing - parse json
app.use(bodyParser.json())

// Handle cross-site request
app.use(cors())

app.use(logger('dev'))

// Initialize Passport and enable persistent login sessions stored in mongodb
const sessionOptions = {
  secret: 'cmccormack-voting-app',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new MongoStore({ mongooseConnection: db })
}
app.use(session(sessionOptions))
app.use(passport.initialize())
app.use(passport.session())

const passportInit = require('./passport/init')
passportInit(passport, models)


///////////////////////////////////////////////////////////
//  Import Express Routes and call with Express app
///////////////////////////////////////////////////////////
const routes = require('./routes/routes.js')
routes(app, passport, models)



///////////////////////////////////////////////////////////
//  Start Express Server
///////////////////////////////////////////////////////////
const server = app.listen(app.get('port'), () => {
  const {port, address} = server.address()
  console.log(`Express server started on ${address}:${port}`)
})



