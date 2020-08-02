const {Router} = require('express')
const router = Router()
const Dentist = require('../models/dentist')
const Change = require('../models/change')
const ChartWeekDay = require('../models/chartWeekDay')

// Получение массива объектов строк из модели выходного дня "ChartWeekDay"
router.use('/', async (req, res) => { // принимаем запрос, создаём асинхронную стрелочную функцию.
  try {
    /* понадобятся для хранения данных о рабочих часах и дантистах */
    const changeWeekArr = [],
          dentistArr = [],
          changeArr = []
    
    await Dentist.findAll({}).then(dent => { // обращаемся к модели "Dentist", загружаем все данные
      for (let val=0; val<dent.length; val++) { // перебираем их
        let dentist = {}, // тут храним временные данные каждой строки
            data = dent[val].dataValues // тут храним объект строки
        for(let key in data){ // перебираем ключи полей строки
          if(key === 'id' || key === 'fio') dentist[key] = data[key]
        }
        /* заносим временный объект dentist в основной массив */
        dentistArr.push(dentist)
      }
    })

    await Change.findAll({}).then(changes => { // обращаемся к модели "Change", загружаем все данные
      for (let val=0; val<changes.length; val++) { // перебираем их
        let change = {}, // тут храним временные данные каждой строки
            data = changes[val].dataValues // тут храним объект строки
        for(let key in data){ // перебираем ключи полей строки
          /* 
            исключаем поля 'createdAt' и 'updatedAt', заносим данные строки во временный объект "change":
            ключ - ключ поля строки, значение - значение поля строки
            */
          if(key != 'createdAt' && key != 'updatedAt') change[key] = data[key]
        }
        /* 
          заносим временный объект "change" в основной массив
        */
        changeArr.push(change)
      }
    })

    await ChartWeekDay.findAll({}).then(charWeek => { // обращаемся к модели "ChartWeekDay", загружаем все данные
      charWeek.forEach(char => {
        let change = {}
        for(let key in char.dataValues){
          if(key != 'createdAt' && key != 'updatedAt') { // исключаем поля 'createdAt' и 'updatedAt'
            if(key === 'dentId'){
              dentistArr.forEach(dent => {
                if(dent.id === char[key]) char[key] = dent.fio
              })
            }
            else if(key === 'weekJob'){
              if(char[key] === null) char[key] = 'вых'
              else {
                changeArr.forEach(ch => { // перебираем основной массив changeArr
                  /* 
                  если id одной из строк равен значению поля из перебора, 
                  меняем значение поля из перебора на найденное время
                  */
                  if (ch.id === char[key]) {
                    const start_change = ch.startChange,
                          end_change = ch.endChange
                    char[key] = start_change + '-' + end_change // меняем значение поля с id  на время*/
                  }
                })
              }
            }
            change[key] = char[key]
          }
        }
        changeWeekArr.push(change)
      })
    })
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080') // отправляем заголовок рукопожатия
    res.status(200).json(changeWeekArr) // отправляем объект 'changeArr' с соответствующим статусом
  } catch (e) { // в случае ошибки
    console.log(e) // вывести в консоль сообщение
    res.status(500).json({ // отправить клиенту код ошибки с сообщением
      message: 'Server error'
    })
  }
})

module.exports = router