/*const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const change = require('./change')
const dentist = require('./dentist')

const timesheet = sequelize.define('timesheet', {
  t_id: {
    type: Sequelize.INTEGER(2),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  t_dentist: {
    type: Sequelize.INTEGER(2),
    references: {
      model: dentist,
      key: 'd_id'
    },
    allowNull: false
  },
  t_0: {
    type: Sequelize.INTEGER(2),
    references: {
      model: change,
      key: 'c_id'
    }
  },
  t_1: {
    type: Sequelize.INTEGER(2),
    references: {
      model: change,
      key: 'c_id'
    }
  },
  t_2: {
    type: Sequelize.INTEGER(2),
    references: {
      model: change,
      key: 'c_id'
    }
  },
  t_3: {
    type: Sequelize.INTEGER(2),
    references: {
      model: change,
      key: 'c_id'
    }
  },
  t_4: {
    type: Sequelize.INTEGER(2),
    references: {
      model: change,
      key: 'c_id'
    }
  },
  t_5: {
    type: Sequelize.INTEGER(2),
    references: {
      model: change,
      key: 'c_id'
    }
  },
  t_6: {
    type: Sequelize.INTEGER(2),
    references: {
      model: dentist,
      key: 'd_id'
    }
  }
})*/

/*
timesheet.bulkCreate([
  {t_dentist: 1, t_3: 4},
  {t_dentist: 2, t_1: 1, t_2: 2, t_3: 1, t_4: 2, t_5: 1},
  {t_dentist: 3, t_1: 2, t_2: 1, t_3: 2, t_4: 1, t_5: 2, t_6: 1},
  {t_dentist: 4, t_1: 1, t_2: 2, t_3: 1, t_4: 2, t_5: 1},
  {t_dentist: 5, t_1: 3, t_2: 3, t_3: 3, t_4: 3, t_5: 3},
  {t_dentist: 6, t_1: 5, t_2: 5, t_5: 6}
])
*/

/*module.exports = timesheet*/