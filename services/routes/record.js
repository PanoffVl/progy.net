const {Router} = require('express')
const router = Router()
const record_keeping = require('../models/record_keeping')
const moment = require('moment')

router.post('/', async (req, res) => {
  let recordText = req.body.record,
      recordArr = recordText.split('/'),
      message = 'запись успешно добавлена'

  await  record_keeping.create({
    rk_data: recordArr[0],
    rk_time: recordArr[1],
    rk_dentist: recordArr[2],
    rk_patient: recordArr[3],
    rk_p_email: recordArr[4],
    rk_p_tel: recordArr[5],
    rk_text: recordArr[6]
  })
    .then(res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'))
    .then(res.status(200).json({message}))
})

module.exports = router