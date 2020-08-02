const {Router} = require('express')
const td1 = require('../models/td1')
const td2 = require('../models/td2')
const td3 = require('../models/td3')
const td4 = require('../models/td4')
const td5 = require('../models/td5')
const td6 = require('../models/td6')
const router = Router()

// Получение расписание рабочего времени
router.post('/', async (req, res) => {
  try {
    let dentist = []
    /*const dentist = await dentists.findAll().then(res.status(200).json(dentist))*/
    if(td1.findOne({where: {id_dent: req.body.title}})) { 
      const dent = await td1.findAll({where: {id_dent: req.body.title}})
      dent.forEach(d => {
        dentist.push(d)
      }); 
    } 
    if(td2.findOne({where: {id_dent: req.body.title}})) { 
      const dent = await td2.findAll({where: {id_dent: req.body.title}})
      dent.forEach(d => {
        dentist.push(d)
      });  
    } 
    if(td3.findOne({where: {id_dent: req.body.title}})) { 
      const dent = await td3.findAll({where: {id_dent: req.body.title}})
      dent.forEach(d => {
        dentist.push(d)
      });  
    } 
    if(td4.findOne({where: {id_dent: req.body.title}})) { 
      const dent = await td4.findAll({where: {id_dent: req.body.title}})
      dent.forEach(d => {
        dentist.push(d)
      });  
    } 
    if(td5.findOne({where: {id_dent: req.body.title}})) { 
      const dent = await td5.findAll({where: {id_dent: req.body.title}})
      dent.forEach(d => {
        dentist.push(d)
      });  
    } 
    if(td6.findOne({where: {id_dent: req.body.title}})) { 
      const dent = await td6.findAll({where: {id_dent: req.body.title}})
      dent.forEach(d => {
        dentist.push(d)
      });  
    }

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.status(200).json({dentist})
    dentist = []
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

module.exports = router