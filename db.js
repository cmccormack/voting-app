const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '.env')})

const { dbuser, dbpw, dbhost, dbname, } = process.env
module.exports = {
  url: `mongodb+srv://${dbhost}/${dbname}`,
  db: dbname,
  options: {
    user: dbuser,
    pass: dbpw,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
}