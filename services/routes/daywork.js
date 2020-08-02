const {Router} = require('express')
const Denist = require('../models/dentist')
/*const TD1 = require('../models/td1')*/
/*const td2 = require('../models/td2')
const td3 = require('../models/td3')
const td4 = require('../models/td4')
const td5 = require('../models/td5')
const td6 = require('../models/td6')*/
const router = Router()

// Получение расписание рабочего времени
router.post('/', async (req, res) => {
  try {
    let dentist = []
    const dent = await Dentist.findAll({include: [ User ]})
    console.log('_________________________________________')
    console.log(dent)
    console.log('_________________________________________')
    /*const dentist = await dentists.findAll().then(res.status(200).json(dentist))*/
    /*if(TD1.findOne({where: {dent: req.body.title}})) { 
      const dent = await td1.findAll({where: {dent: req.body.title}})
      console.log('_________________________________________')
      console.log(dent)
      console.log('_________________________________________')
      dent.forEach(d => {
        dentist.push(d)
      }); 
    }*/
    /*res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.status(200).json({dentist})
    dentist = []*/
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

module.exports = router