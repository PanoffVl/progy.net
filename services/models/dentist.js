const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const Model = Sequelize.Model;
const Change = require('./change')

class Dentist extends Model {}
Dentist.init({
  id: { type: Sequelize.INTEGER(2), primaryKey: true, autoIncrement: true },
  fio: { type: Sequelize.STRING(50) },
  post: { type: Sequelize.STRING(30) },
  desc: { type: Sequelize.STRING },
  timeJob: { type: Sequelize.INTEGER(2) },
  weekJob0: { type: Sequelize.INTEGER(2),
    references: {
      model: Change,
      key: 'id'
    } 
  },
  weekJob1: { type: Sequelize.INTEGER(2),
    references: {
      model: Change,
      key: 'id'
    } 
  },
  weekJob2: { type: Sequelize.INTEGER(2),
    references: {
      model: Change,
      key: 'id'
    } 
  },
  weekJob3: { type: Sequelize.INTEGER(2),
    references: {
      model: Change,
      key: 'id'
    } 
  },
  weekJob4: { type: Sequelize.INTEGER(2),
    references: {
      model: Change,
      key: 'id'
    } 
  },
  weekJob5: { type: Sequelize.INTEGER(2),
    references: {
      model: Change,
      key: 'id'
    } 
  },
  weekJob6: { type: Sequelize.INTEGER(2),
    references: {
      model: Change,
      key: 'id'
    } 
  }
},{ sequelize, modelName: 'dentist' })
/*
Dentist.bulkCreate([
  {fio: 'Скорняков Георгий Борисович', post: 'Хирург-стоматолог', timeJob: 20, weekJob3: 4},
  {fio: 'Паравицын Анатолий Николаевич', post: 'Терапевт-ортопед', timeJob: 60, weekJob1: 1, weekJob2: 2, weekJob3: 1, weekJob4: 2, weekJob5: 1},
  {fio: 'Кузнецова Татьяна Васильевна', post: 'Терапевт-стоматолог', timeJob: 60,  weekJob1: 2,  weekJob2: 1,  weekJob3: 2,  weekJob4: 1,  weekJob5: 2,  weekJob6: 1},
  {fio: 'Рыбянченко Ульяна Дмитриевна', post: 'Детский-стоматолог', timeJob: 60, weekJob1: 1, weekJob2: 2, weekJob3: 1, weekJob4: 2, weekJob5: 1},
  {fio: 'Томазов Василий Николаевич', post: 'Терапевт-стоматолог', timeJob: 60, weekJob1: 3, weekJob2: 3, weekJob3: 3, weekJob4: 3, weekJob5: 3},
  {fio: 'Побегов Олег Николаевич', post: 'Хирург-стоматолог', timeJob: 60, weekJob1: 5, weekJob2: 5, weekJob5: 6}
])
*/
module.exports = Dentist