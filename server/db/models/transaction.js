const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      isInt: true
    }
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  totalPrice: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
})

module.exports = Transaction
