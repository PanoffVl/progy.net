const express = require('express')
/*const moment = require('moment')*/
const app = express ()
const server = require('http').Server(app)
var io = require('socket.io')(server);
const sequelize = require('./utils/database')
const dentRoutes = require('./routes/dent')
const changeRoutes = require('./routes/change')
const changeWeekRoutes = require('./routes/cangeWeekDay')
const dayWorkRoutes = require('./routes/daywork')
require('./utils/schedule')
/*const recordRoutes = require('./routes/record')*/
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type')
  res.setHeader('Access-Control-Max-Age', '86400')
  next()
})
app.use('/api/rules', dentRoutes) // получам запрос от App.vue -> created() и отправляем его в routes -> dent.js
app.use('/api/dent', dentRoutes) // получам запрос от App.vue -> created() и отправляем его в routes -> dent.js
app.use('/api/change', changeRoutes) // получам запрос от App.vue -> created() и отправляем его в routes -> change.js
app.use('/api/change_week', changeWeekRoutes) // получам запрос от App.vue -> created() и отправляем его в routes -> cangeWeekDay.js
app.use('/api/daywork', dayWorkRoutes)
/*app.use('/api/record', recordRoutes)*/

async function startDB() {
  try {
    await sequelize.sync()
    app.listen(PORT)
    console.log('Adress server: ' + app.address() + ', and port server: ' + PORT)
  } catch (e) {
    console.log(e)
  }
}

startDB()
