const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'anshu710', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
