const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const dentist = require('./dentist')

const td3 = sequelize.define('td3', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  id_dent: {
    type: Sequelize.INTEGER(2),
    references: {
      model: dentist,
      key: 'd_id'
    },
    allowNull: false
  },
  data: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  h9: {
    type: Sequelize.INTEGER(1),
    defaultValue: 0,
    allowNull: false
  },
  h10: {
    type: Sequelize.INTEGER(1),
    defaultValue: 0,
    allowNull: false
  },
  h11: {
    type: Sequelize.INTEGER(1),
    defaultValue: 0,
    allowNull: false
  },
  h12: {
    type: Sequelize.INTEGER(1),
    defaultValue: 0,
    allowNull: false
  },
  h13: {
    type: Sequelize.INTEGER(1),
    defaultValue: 0,
    allowNull: false
  },
  h14: {
    type: Sequelize.INTEGER(1),
    defaultValue: 0,
    allowNull: false
  },
  h15: {
    type: Sequelize.INTEGER(1),
    defaultValue: 0,
    allowNull: false
  },
  h16: {
    type: Sequelize.INTEGER(1),
    defaultValue: 0,
    allowNull: false
  },
  h17: {
    type: Sequelize.INTEGER(1),
    defaultValue: 0,
    allowNull: false
  }
})

/*
td3.bulkCreate([
  {id_dent: 3, data: '2020-03-17', h13: 1, h14: 1, h15: 1, h16: 1, h17: 1},
  {id_dent: 3, data: '2020-03-18', h9: 1, h10: 1, h11: 1, h12: 1, h13: 1, h14: 1},
  {id_dent: 3, data: '2020-03-19', h13: 1, h14: 1, h15: 1, h16: 1, h17: 1},
  {id_dent: 3, data: '2020-03-20', h9: 1, h10: 1, h11: 1, h12: 1, h13: 1, h14: 1},
  {id_dent: 3, data: '2020-03-21'},
  {id_dent: 3, data: '2020-03-22'},
  {id_dent: 3, data: '2020-03-23', h13: 1, h14: 1, h15: 1, h16: 1, h17: 1},
  {id_dent: 3, data: '2020-03-24', h9: 1, h10: 1, h11: 1, h12: 1, h13: 1, h14: 1},
  {id_dent: 3, data: '2020-03-25', h13: 1, h14: 1, h15: 1, h16: 1, h17: 1},
  {id_dent: 3, data: '2020-03-26', h9: 1, h10: 1, h11: 1, h12: 1, h13: 1, h14: 1},
  {id_dent: 3, data: '2020-03-27', h13: 1, h14: 1, h15: 1, h16: 1, h17: 1},
  {id_dent: 3, data: '2020-03-28', h9: 1, h10: 1, h11: 1, h12: 1, h13: 1, h14: 1},
  {id_dent: 3, data: '2020-03-29'},
  {id_dent: 3, data: '2020-03-30', h9: 1, h10: 1, h11: 1, h12: 1, h13: 1, h14: 1},
  {id_dent: 3, data: '2020-03-31', h13: 1, h14: 1, h15: 1, h16: 1, h17: 1},
  {id_dent: 3, data: '2020-04-01', h9: 1, h10: 1, h11: 1, h12: 1, h13: 1, h14: 1},
  {id_dent: 3, data: '2020-04-02', h13: 1, h14: 1, h15: 1, h16: 1, h17: 1},
  {id_dent: 3, data: '2020-04-03', h9: 1, h10: 1, h11: 1, h12: 1, h13: 1, h14: 1},
  {id_dent: 3, data: '2020-04-04'},
  {id_dent: 3, data: '2020-04-05'},
])
*/

module.exports = td3