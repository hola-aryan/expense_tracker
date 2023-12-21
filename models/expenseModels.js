const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const expenseModels = sequelize.define('expenseUserInfo', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  names: {
    type: Sequelize.STRING,
    allowNull: false
  },
  emails: {
    type: Sequelize.STRING,
    allowNull: false
  },
  passwords: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports = expenseModels;
