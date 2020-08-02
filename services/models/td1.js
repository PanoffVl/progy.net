const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const Model = Sequelize.Model;
const Dentist = require('./dentist')

class TD1 extends Model {}
TD1.init({
  id: { type: Sequelize.INTEGER(2), primaryKey: true, autoIncrement: true },
  dent: { 
    type: Sequelize.INTEGER(2),
    references: {
      model: Dentist,
      key: 'id'
    }
   },
  data: { type: Sequelize.DATEONLY },
  h12: { type: Sequelize.INTEGER(1), defaultValue: 0 },
  h12m20: { type: Sequelize.INTEGER(1), defaultValue: 0 },
  h12m40: { type: Sequelize.INTEGER(1), defaultValue: 0 },
  h13: { type: Sequelize.INTEGER(1), defaultValue: 0 },
  h13m20: { type: Sequelize.INTEGER(1), defaultValue: 0 },
  h13m40: { type: Sequelize.INTEGER(1), defaultValue: 0 },
  h14: { type: Sequelize.INTEGER(1), defaultValue: 0 },
  h14m20: { type: Sequelize.INTEGER(1), defaultValue: 0 },
  h14m40: { type: Sequelize.INTEGER(1), defaultValue: 0 },
  h15: { type: Sequelize.INTEGER(1), defaultValue: 0 },
  h15m20: { type: Sequelize.INTEGER(1), defaultValue: 0 },
  h15m40: { type: Sequelize.INTEGER(1), defaultValue: 0 },
  h16: { type: Sequelize.INTEGER(1), defaultValue: 0 },
  h16m20: { type: Sequelize.INTEGER(1), defaultValue: 0 },
  h16m40: { type: Sequelize.INTEGER(1), defaultValue: 0 }
},{ sequelize, modelName: 'td1' })


/*
td1.bulkCreate([
  {id_dent: 1, data: '2020-3-25', h12: 1, h12m20: 1, h12m40: 1, h13: 1, h13m20: 1, h13m40: 1, h14: 1, h14m20: 1, h14m40: 1, h15: 1, h15m20: 1, h15m40: 1, h16: 1, h16m20: 1, h16m40: 1},
  {id_dent: 1, data: '2020-3-26'},
  {id_dent: 1, data: '2020-3-27'},
  {id_dent: 1, data: '2020-3-28'},
  {id_dent: 1, data: '2020-3-29'},
  {id_dent: 1, data: '2020-3-30'},
  {id_dent: 1, data: '2020-3-31'},
  {id_dent: 1, data: '2020-4-01', h12: 1, h12m20: 1, h12m40: 1, h13: 1, h13m20: 1, h13m40: 1, h14: 1, h14m20: 1, h14m40: 1, h15: 1, h15m20: 1, h15m40: 1, h16: 1, h16m20: 1, h16m40: 1},
  {id_dent: 1, data: '2020-4-02'},
  {id_dent: 1, data: '2020-4-03'},
  {id_dent: 1, data: '2020-4-04'},
  {id_dent: 1, data: '2020-4-05'},
  {id_dent: 1, data: '2020-4-06'},
  {id_dent: 1, data: '2020-4-07'},
  {id_dent: 1, data: '2020-4-08', h12: 1, h12m20: 1, h12m40: 1, h13: 1, h13m20: 1, h13m40: 1, h14: 1, h14m20: 1, h14m40: 1, h15: 1, h15m20: 1, h15m40: 1, h16: 1, h16m20: 1, h16m40: 1}
])

text: 
{id_dent: 1, data: '2020-03-30'}, 
{id_dent: 1, data: '2020-03-31'}, 
{id_dent: 1, data: '2020-04-01'}, 
{id_dent: 1, data: '2020-04-02', h12: 1, h12m20: 1, h12m40: 1, h13: 1, h13m20: 1, h13m40: 1, h14: 1, h14m20: 1, h14m40: 1, h15: 1, h15m20: 1, h15m40: 1, h16: 1, h16m20: 1, h16m40: 1}, 
{id_dent: 1, data: '2020-04-03'}, 
{id_dent: 1, data: '2020-04-04'}, 
{id_dent: 1, data: '2020-04-05'}, 
{id_dent: 1, data: '2020-03-30'}, 
{id_dent: 1, data: '2020-03-31'}, 
{id_dent: 1, data: '2020-04-01'}, 
{id_dent: 1, data: '2020-04-02', h12: 1, h12m20: 1, h12m40: 1, h13: 1, h13m20: 1, h13m40: 1, h14: 1, h14m20: 1, h14m40: 1, h15: 1, h15m20: 1, h15m40: 1, h16: 1, h16m20: 1, h16m40: 1}, 
{id_dent: 1, data: '2020-04-03'}, 
{id_dent: 1, data: '2020-04-04'}, 
{id_dent: 1, data: '2020-04-05'}
===============
Executing (default): INSERT INTO `td1s` (`id`,`h12`,`h12m20`,`h12m40`,`h13`,`h13m20`,`h13m40`,`h14`,`h14m20`,`h14m40`,`h15`,`h15m20`,`h15m40`,`h16`,`h16m20`,`h16m40`,`createdAt`,`updatedAt`) VALUES (NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'2020-03-30 08:41:21','2020-03-30 08:41:21'); 

*/

module.exports = TD1