const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const dentist = require('./dentist')

const record_keeping = sequelize.define('record_keeping', {
  rk_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  rk_data: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  rk_time: {
    type: Sequelize.STRING(6),
    allowNull: false
  },
  rk_dentist: {
    type: Sequelize.INTEGER(2),
    references: {
      model: dentist,
      key: 'd_id'
    },
    allowNull: false
  },
  rk_patient: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  rk_p_email: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  rk_p_tel: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  rk_text: {
    type: Sequelize.TEXT
  }
})

/*
record_keeping.bulkCreate([
  {rk_data: '2020-04-07', rk_time: '10:00', rk_dentist: 3, rk_patient: 'Усольцева Виктория Ивановна', rk_p_email: 'v.usoltseva@gmail.com', rk_p_tel: '89188569588', rk_text: 'Опухла десна'},
  {rk_data: '2020-04-07', rk_time: '13:00', rk_dentist: 2, rk_patient: 'Синицына Ирина Аркадьевна', rk_p_email: 'i.sinicyna@gmail.com', rk_p_tel: '89886985654', rk_text: 'Сильная боль'},
  {rk_data: '2020-04-07', rk_time: '14:00', rk_dentist: 4, rk_patient: 'Бажанов Глеб Русланович', rk_p_email: 'g.bajanov@gmail.com', rk_p_tel: '89189512543', rk_text: 'Выпала пломба'},
  {rk_data: '2020-04-07', rk_time: '14:00', rk_dentist: 5, rk_patient: 'Дериглазова Анастасия Викторовна', rk_p_email: 'a.deriglazova@gmail.com', rk_p_tel: '89182554361', rk_text: 'Шатается зуб'}
])
*/

module.exports = record_keeping