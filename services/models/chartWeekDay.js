const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const Model = Sequelize.Model;
const Dentist = require('../models/dentist')
const Change = require('./change')

class CharWeekDay extends Model {}
CharWeekDay.init({
  id: { type: Sequelize.INTEGER(2), primaryKey: true, autoIncrement: true },
  dentId: { type: Sequelize.INTEGER(2),
    references: {
      model: Dentist,
      key: 'id'
    } 
  },
  weekJob: { type: Sequelize.INTEGER(2),
    references: {
      model: Change,
      key: 'id'
    } 
  }
},{ sequelize, modelName: 'charWeekDay' })
/*
CharWeekDay.bulkCreate([
  {dentId: 2, weekJob: null},
  {dentId: 3, weekJob: 1},
  {dentId: 4, weekJob: null},
  {dentId: 5, weekJob: null}
])
*/
module.exports = CharWeekDay