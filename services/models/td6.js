const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const dentist = require('./dentist')

const td6 = sequelize.define('td6', {
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
  }
})

/*
td6.bulkCreate([
  {id_dent: 6, data: '2020-03-17', h10: 1, h11: 1, h12: 1, h13: 1},
  {id_dent: 6, data: '2020-03-18'},
  {id_dent: 6, data: '2020-03-19'},
  {id_dent: 6, data: '2020-03-20', h11: 1, h12: 1, h13: 1, h14: 1},
  {id_dent: 6, data: '2020-03-21'},
  {id_dent: 6, data: '2020-03-22'},
  {id_dent: 6, data: '2020-03-23', h10: 1, h11: 1, h12: 1, h13: 1},
  {id_dent: 6, data: '2020-03-24', h10: 1, h11: 1, h12: 1, h13: 1},
  {id_dent: 6, data: '2020-03-25'},
  {id_dent: 6, data: '2020-03-26'},
  {id_dent: 6, data: '2020-03-27', h11: 1, h12: 1, h13: 1, h14: 1},
  {id_dent: 6, data: '2020-03-28'},
  {id_dent: 6, data: '2020-03-29'},
  {id_dent: 6, data: '2020-03-30', h10: 1, h11: 1, h12: 1, h13: 1},
  {id_dent: 6, data: '2020-03-31', h10: 1, h11: 1, h12: 1, h13: 1},
  {id_dent: 6, data: '2020-04-01'},
  {id_dent: 6, data: '2020-04-02'},
  {id_dent: 6, data: '2020-04-03', h11: 1, h12: 1, h13: 1, h14: 1},
  {id_dent: 6, data: '2020-04-04'},
  {id_dent: 6, data: '2020-04-05'},
])
*/

module.exports = td6