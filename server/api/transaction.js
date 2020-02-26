const router = require('express').Router()
const {Transaction, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: {
        userId: req.user.id
      }
    })
    res.json(transactions)
  } catch (err) {
    next(err)
  }
})

router.get('/:symbol', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: {
        symbol: req.params.symbol
      }
    })
    if (transactions) {
      const totalQty = transactions.reduce((accumulator, transaction) => {
        return accumulator + +transaction.quantity
      }, 0)
      const totalPrice = transactions.reduce((accumulator, transaction) => {
        return accumulator + +transaction.totalPrice
      }, 0)
      const avgPrice = totalPrice / totalQty
      const transactionSummary = {
        id: transactions[0].id,
        userId: req.user.id,
        symbol: req.params.symbol,
        name: transactions[0].name,
        quantity: totalQty,
        price: avgPrice,
        totalPrice: totalPrice
      }
      res.json(transactionSummary)
    } else {
      res.status(404).send(`No transactions for ${req.params.symbol}`)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/buy', async (req, res, next) => {
  try {
    // const user = await User.findOne({
    //   where: {id: req.user.id}
    // })
    const totalPurchase = +req.body.latestPrice * +req.body.quantity
    //check to see if the user has enough balance to make purchase:
    /*if (totalPurchase > +user.cash) {
      res.status(400).send('Not enough cash!')
    } else {
      await user.update({
        cash: +user.cash - totalPurchase
      })*/
    const purchase = await Transaction.create({
      userId: req.user.id,
      symbol: req.body.symbol,
      name: req.body.companyName,
      quantity: +req.body.quantity,
      price: +req.body.latestPrice,
      totalPrice: totalPurchase
    })
    res.send(purchase)
    //}
  } catch (error) {
    next(error)
  }
})
