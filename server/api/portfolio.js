const router = require('express').Router()
const {Portfolio, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findAll({
      where: {
        userId: req.user.id
      }
    })
    res.json(portfolio)
  } catch (err) {
    next(err)
  }
})

router.post('/buy', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {id: req.user.id}
    })
    const totalPurchase = +req.body.latestPrice * +req.body.quantity
    //check to see if the user has enough balance to make purchase:
    if (totalPurchase > +user.cash) {
      res.status(400).send('Not enough cash!')
    } else {
      await user.update({
        cash: +user.cash - totalPurchase
      })
      const purchaseExists = await Portfolio.findOne({
        where: {symbol: req.body.symbol, userId: req.user.id}
      })
      if (!purchaseExists) {
        const purchase = await Portfolio.create({
          userId: req.user.id,
          symbol: req.body.symbol,
          name: req.body.companyName,
          quantity: +req.body.quantity,
          price: +req.body.latestPrice,
          totalPrice: totalPurchase
        })

        res.send(purchase)
      } else {
        await purchaseExists.update(
          {
            quantity: +purchaseExists.quantity + +req.body.quantity,
            price: +req.body.latestPrice,
            totalPrice: +purchaseExists.totalPrice + totalPurchase
          },
          {where: {userId: req.user.id}}
        )

        res.send(purchaseExists)
      }
    }
  } catch (error) {
    next(error)
  }
})
