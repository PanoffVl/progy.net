const schedule = require('node-schedule')
const moment = require('moment')
const td1 = require('../models/td1')
const td2 = require('../models/td2')
const td3 = require('../models/td3')
const td4 = require('../models/td4')
const td5 = require('../models/td5')
const td6 = require('../models/td6')
const dentist = require('../models/dentist')
require('../models/record_keeping')

var date = toDate(),
    time = moment(date).minute(330) // получаем час ночи
    timeSecond = moment().add(2, 's')
    

/* запускаем главную функция и передаём ей таблицу в определённое время */
schedule.scheduleJob(new Date(timeSecond.format('YYYY-MM-DDTHH:mm:ss')), async function(){
  await timesheetUpdate(), // обновляем график выходного дня
  await dbStartUpdate(td1)
})

/* функция обновления графика рабочего времени выходного дня */
async function timesheetUpdate() {
  dateOfWeek = moment().day() // получаем день недели
  /* если сегодня "Воскресенье", тогда */
  if(dateOfWeek === 0) {
    await dentist.findAll( { where: { d_weekJob6: 1 }, raw:true }) // получаем строку где d_weekJob6: 1
      .then(day => { 
        let dentistId = day[0].d_id // получаем поле d_id данной строки
        dentist.update({ d_weekJob6: null }, { where: { d_id: dentistId } }) // меняем значение данного поля полученной строки на NULL
        if(dentistId === 6) dentistId = 2// если последний, из списка, дантист отработал, тогда начинаем с третьего дантиста
        dentist.update({ d_weekJob6: 1 }, { where: { d_id: dentistId + 1 } }) // меняем значение данного поля следующей строки на 1
        if(dentistId === 5) dentistId = 1
        dentist.update({ d_weekJob7: 1 }, { where: { d_id: dentistId + 2 } }) // меняем значение данного поля следующей строки на 1
      })
  }
}

/* главная функция */
async function dbStartUpdate(tableName) { // получаем имя таблицы
  let dateNow = toDate(), // получаем сегодняшний день
      yesterday = toDate(-1), // получаем вчерашний день
      datePreEnd = toDate(13) // получаем предпоследний день

  /* удаляем график за вчерашний день если он есть */
  await tableName.findAll( { where: { data: yesterday }, raw:true }).then(day => {
    if(day[0] !== undefined) {
      tableName.destroy({ where: { data: yesterday } })
    }
  }),

  /**
   * блок проверяет график на сегодня, если его нет или нет графика на предпоследнюю дату 
   * запускается функция отчистки и нового заполнения таблицы
   * если с графиками всё в порядке запускаем функцию добавления графика на последнюю дату
   */
  tableName.findAll({ where: { data: dateNow }, raw:true })
    .then(day => {
      if(day[0] === undefined) { // если графика на сегодня нет
        newUpdateTable(tableName) // запускаем функцию отчистки и нового заполнения таблицы, аргумент (имя таблицы)
      } else {
        tableName.findAll({ where: { data: datePreEnd }, raw:true })
        .then(day => {
          if(day[0] === undefined) { // если графика на предпоследний день нет
            newUpdateTable(tableName) // запускаем функцию отчистки и нового заполнения таблицы, аргумент (имя таблицы)
          } else {
            addEndDate(tableName) // запускаем функцию добавления графика на последнюю дату, аргумент (имя таблицы)
          }
        })
      }
    })
}

/* функция для оформления даты в виде "2020-03-25" */
function toDate(day) { // получаем день
  if(day === undefined) day = 0 // если день не указан, присваиваем нулевое значение
  let date = moment() // получаем сегодняшнюю дату
  date.add(day, 'd') // прибавляем к сегодняшней дате количество полученных дней
  return date.format('YYYY-MM-DD') // возвращаем оформленную дату
}

/* функция отчистки и нового заполнения таблицы */
async function newUpdateTable(tableName) { // получаем имя таблицы
  await  tableName.destroy({ where: {}, truncate: true }) // удаляем все строки из данной таблицы
  await newAddTable(tableName) // запускаем функцию нового заполнения таблицы, аргумент (имя таблицы)
  await addEndDate(tableName) // запускаем функцию добавления графика на последнюю дату, аргумент (имя таблицы)
}

/* функция нового заполнения таблицы */
async function newAddTable(tableName) { // получаем имя таблицы
  let date = toDate(), // получаем сегодняшнюю дату
      dateNow = moment(date, "YYYY-MM-DD"), // оформляем её
      dateOfWeek = moment().day() // получаем день недели

  for(let i = 0; i<14; i++) { // цикл на 14 повторений
    if(dateOfWeek>6) dateOfWeek = 0 // если день недели равен субботе, то переводим его на воскресенье
    await createTable(tableName, dateOfWeek, dateNow) // запускаем функцию заполнения строки, аргументы (имя таблицы, день недели, день месяца)
    dateNow.add(1, 'd') // переходим к следующему дню
    dateOfWeek++ // переходим к следующему дню недели
  }
}

/* функция добавления графика на последнюю дату */
async function addEndDate(tableName) { // получаем имя таблицы
  let date = toDate(), // получаем сегодняшнюю дату
      dateEnd = moment(date, "YYYY-MM-DD"), // оформляем её
      dateOfWeek = moment().day() // получаем день недели
  
  dateEnd.add(14, 'd') // переводим дату на последнюю
  dateOfWeek = dateEnd.day() // получаем день недели последней даты

  await tableName.findAll( { where: { data: dateEnd }, raw:true }).then(day => {
    if(day[0] === undefined) { // если график на последнюю дату отсутствует
      createTable(tableName, dateOfWeek, dateEnd) // запускаем функцию заполнения строки, аргументы (имя таблицы, день недели, день месяца)
    }
  })
}

/* функция получения ID */
async function createDentistID(tableName) {
  return new Promise(function(resolve, reject) {
    let dentistId = 0
    if(tableName === td1) {dentistId = 1}
    resolve(dentistId)
  })
}

/* функция получения рабочего времени */
async function createTimesheetHours(dentistId) { // получаем ID дантиста
  return new Promise(function(resolve, reject) {
    let timesheetHours = [] // тут будем складировать рабочее время
    dentist.findAll({ where: {d_id: dentistId}, raw:true }) // получаем строку с графиком рабочего времени этого дантиста
      .then( day => {
        Object.keys(day[Object.keys(day)[0]]).forEach(k => { // проходимся по всем ключам
          for(let i=0; i<7; i++) { // цикл на 7 повторений
            if(k === 'd_weekJob'+i) { // если в ключе содержится параметр d_weekJob[i]
              timesheetHours.push(day[0][k]) // добавляем его значение в наш массив
            }
          }
        })
        resolve(timesheetHours) // результируем массив
      })
  })
}

/* функция заполнения строки */
async function createTable(tableName, dateOfWeek, date) { // получаем имя таблицы, день недели, день месяца
  let dentistId = await createDentistID(tableName), // получаем ID дантиста, аргумент (имя таблицы)
      timesheetHours = await createTimesheetHours(dentistId) // получаем рабочее время, аргумент (ID дантиста)
      value = timesheetHours[dateOfWeek] // получаем значение рабочего времени на переданный день недели 

  /* в зависимости от полученного значения активируется определённый шаблон заполнения строки */    

  if(value === null) {
    await tableName.create({
      id_dent: dentistId, 
      data: date.format()
    })
  }
  else if(value === 1) {
    await  tableName.create({
      id_dent: dentistId, 
      data: date.format(), 
      h9: 1, 
      h10: 1, 
      h11: 1, 
      h12: 1, 
      h13: 1,
      h14: 1
    })
  }
  else if(value === 2) {
    await  tableName.create({
      id_dent: dentistId, 
      data: date.format(), 
      h12: 1, 
      h13: 1,
      h14: 1,
      h15: 1,
      h16: 1,
      h17: 1
    })
  }
  else if(value === 3) {
    await  tableName.create({
      id_dent: dentistId, 
      data: date.format(), 
      h9: 1, 
      h10: 1,
      h11: 1,
      h12: 1, 
      h13: 1,
      h14: 1,
      h15: 1,
      h16: 1
    })
  }
  else if(value === 4) {
    await  tableName.create({
      id_dent: dentistId, 
      data: date.format(), 
      h12: 1, 
      h12m20: 1, 
      h12m40: 1, 
      h13: 1, 
      h13m20: 1, 
      h13m40: 1, 
      h14: 1, 
      h14m20: 1, 
      h14m40: 1, 
      h15: 1, 
      h15m20: 1, 
      h15m40: 1, 
      h16: 1, 
      h16m20: 1, 
      h16m40: 1
    })
  }
  else if(value === 5) {
    await  tableName.create({
      id_dent: dentistId, 
      data: date.format(),
      h10: 1, 
      h11: 1, 
      h12: 1, 
      h13: 1
    })
  }
  else if(value === 6) {
    await  tableName.create({
      id_dent: dentistId, 
      data: date.format(), 
      h11: 1, 
      h12: 1, 
      h13: 1,
      h14: 1
    })
  }
}
