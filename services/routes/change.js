const {Router} = require('express')
const Change = require('../models/change')
const router = Router()

// Получение массива объектов строк из таблицы рабочего времени "Change"
router.use('/', async (req, res) => { // принимаем запрос, создаём асинхронную стрелочную функцию.
  try {
    /* понадобятся для хранения данных о рабочих часах и дантистах */
    const changeArr = []
          
    await Change.findAll({}).then(changes => { // обращаемся к модели "Change", загружаем все данные
      for (let val=0; val<changes.length; val++) { // перебираем их
        let change = {}, // тут храним временные данные каждой строки
            data = changes[val].dataValues // тут храним объект строки
        for(let key in data){ // перебираем ключи полей строки
          if(key != 'createdAt' && key != 'updatedAt') { // исключаем поля 'createdAt' и 'updatedAt'
            /* 
            заносим данные во временный oбъект "change":
            ключ - ключ поля строки, значение - значение поля строки 
            */
            change[key] = data[key] 
          }
        }
        /* заносим временный объект change в основной массив */
        changeArr.push(change)
      }
    })
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080') // отправляем заголовок рукопожатия
    res.status(200).json(changeArr) // отправляем объект 'changeArr' с соответствующим статусом
  } catch (e) { // в случае ошибки
    console.log(e) // вывести в консоль сообщение
    res.status(500).json({ // отправить клиенту код ошибки с сообщением
      message: 'Server error'
    })
  }
})

module.exports = router