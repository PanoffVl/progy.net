const schedule = require('node-schedule')
const moment = require('moment')
const ChartWeekDay = require('../models/chartWeekDay')
const Dentist = require('../models/dentist')

const time = moment().add(2, 'h').format('YYYY-MM-DDTHH:mm:ss')

schedule.scheduleJob(time, async function(){
  await weekDayUpdate() // обновляем график выходного дня
})

/* функция обновления графика рабочего времени выходного дня */
async function weekDayUpdate() {
  const dateOfWeek = moment().day() // получаем день недели
  if(dateOfWeek === 0) { // если сегодня "Воскресенье"
    ChartWeekDay.findAll().then(weekdays => { // получаем все данные из модели "ChartWeekDay"
      ChartWeekDay.findAll( { where: { weekJob: 1 }, raw:true }) // получаем строку где weekJob = 1
      .then(day => {
        const dentWeekJobOld = day[0].dentId, // тут храним id текущего дантиста
              weekDay = day[0].id // тут храним id текущей строки
        let weekDayNew = 0 // тут храним id новой строки
        if(weekDay === weekdays.length) { // если текущая строка последняя в таблице
          weekDayNew = 1 // начинаем с первой строки
        }
        else {
          weekDayNew = weekDay + 1 // иначе переходим к следующей строке
        }
        /*
          запускаем функцию обновления модели "ChartWeekDay"
          1 аргумент - id текущей строки
          2 аргумент - id следующей строки
        */
        chartWeekDayInsert(weekDay, weekDayNew)
        ChartWeekDay.findAll( { where: { id: weekDayNew }, raw:true }).then(chart => { // получаем новую строку
          const dentWeekJobNew = chart[0].dentId // тут храним id нового дантиста
          /*
            запускаем функцию обновления модели "Dentist"
            1 аргумент - id текущего дантиста
            2 аргумент - id нового дантиста
          */
          dentWeekDayInsert(dentWeekJobOld, dentWeekJobNew)
        })
      })
    })
  }
}
/* функция обновления модели "ChartWeekDay" */
async function chartWeekDayInsert(payloadOld, payloadNew) {
  ChartWeekDay.update({ weekJob: null }, {where: {id: payloadOld}}) // обновляем значение weekJob на null, в строке где id = id текущей строки
  ChartWeekDay.update({ weekJob: 1 }, {where: {id: payloadNew}}) // обновляем значение weekJob на 1, в строке где id = id следующей строки
}
/* функция обновления модели "Dentist" */
async function dentWeekDayInsert(payloadOld, payloadNew) {
  Dentist.update({ weekJob6: null }, {where: {id: payloadOld}}) // обновляем значение weekJob6 на null, в строке где id = id текущего дантиста
  Dentist.update({ weekJob6: 1 }, {where: {id: payloadNew}}) // обновляем значение weekJob6 на 1, в строке где id = id нового дантиста
}