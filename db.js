const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '.env')})

const { dbuser, dbpw, dbhost, dbname } = process.env
module.exports = {
  url: `mongodb://${dbhost}/${dbname}`,
  db: dbname,
  options: {
    useMongoClient: true,
    user: dbuser,
    pass: dbpw
  }
}