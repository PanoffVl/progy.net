const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const Model = Sequelize.Model

class Change extends Model {}
Change.init({
  id: { type: Sequelize.INTEGER(2), primaryKey: true, autoIncrement: true },
  startChange: { type: Sequelize.STRING(10) },
  endChange: { type: Sequelize.STRING(10) }
},{ sequelize, modelName: 'change' })
/*
Change.bulkCreate([
  {startChange: '09:00', endChange: '14:00'},
  {startChange: '12:00', endChange: '17:00'},
  {startChange: '09:00', endChange: '16:00'},
  {startChange: '12:00', endChange: '16:40'},
  {startChange: '10:00', endChange: '13:00'},
  {startChange: '11:00', endChange: '14:00'}
])
*/
module.exports = Change