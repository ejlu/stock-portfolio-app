const User = require('./user')
const Portfolio = require('./portfolio')
const Transaction = require('./transaction')

Portfolio.belongsTo(User)
Transaction.belongsTo(User)

module.exports = {
  User,
  Portfolio,
  Transaction
}
