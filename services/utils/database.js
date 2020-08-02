const Sequelize = require('sequelize')

const DB_NAME = 'DBSC'
const USER_NAME = 'scroot'
const PASS = 'GHJ5mnb67'

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASS, {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+03:00'
})

module.exports = sequelize