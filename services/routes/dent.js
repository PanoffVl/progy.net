const {Router} = require('express')
const Dentist = require('../models/dentist')
const Change = require('../models/change')
const router = Router()

// Получение массива объектов строк из таблицы дантистов "Dentist"
router.use('/', async (req, res) => { // принимаем запрос, создаём асинхронную стрелочную функцию.
  try {
    /* понадобятся для хранения данных о дантистах и рабочих часах */
    const changeArr = [],
          dentistArr = []
          
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
    await Dentist.findAll({}).then(dent => { // обращаемся к модели "Dentist", загружаем все данные
      for (let val=0; val<dent.length; val++) { // перебираем их
        let dentist = {}, // тут храним временные данные каждой строки
            data = dent[val].dataValues // тут храним объект строки
        for(let key in data){ // перебираем ключи полей строки
          if(key != 'createdAt' && key != 'updatedAt') { // исключаем поля 'createdAt' и 'updatedAt'
            /* далее будем менять id рабочего времени на реальное рабочее время из модели Change */
            if(key[0] === 'w' && data[key] != null){ // если первый символ ключа поля равен 'w' и значение этого поля не равно null
              changeArr.forEach(change => { // перебираем основной массив changeArr
                /* 
                если id одной из строк равен значению поля из перебора, 
                меняем значение поля из перебора на найденное время
                */
                if (change.id === data[key]) {
                  const start_change = change.startChange,
                        end_change = change.endChange
                  data[key] = start_change + '-' + end_change // меняем значение поля с id  на время*/
                }
              })
            }
            /* 
              заносим данные строки во временный объект:
              ключ - ключ поля строки, значение - значение поля строки 
            */
            dentist[key] = data[key]
          }
        }
        /* заносим временный объект в основной массив */
        dentistArr.push(dentist)
      }
    })
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080') // отправляем заголовок рукопожатия
    res.status(200).json(dentistArr) // отправляем массив 'dentistArr' с соответствующим статусом
  } catch (e) { // в случае ошибки
    console.log(e) // вывести в консоль сообщение
    res.status(500).json({ // отправить клиенту код ошибки с сообщением
      message: 'Server error'
    })
  }
})

module.exports = router