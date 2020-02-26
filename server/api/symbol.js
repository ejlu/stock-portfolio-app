const router = require('express').Router()
const axios = require('axios')
const iexToken = process.env.IEX_SECRET_KEY
const baseUrl = process.env.IEX_BASE_URL
module.exports = router

//get symbols for all IEX companies
router.get('/', async (req, res, next) => {
  try {
    const allTickersUrl = `${baseUrl}/ref-data/iex/symbols?token=${iexToken}`
    const {data} = await axios.get(allTickersUrl)
    const allTickers = data
      .filter(stock => stock.isEnabled)
      .map(stock => stock.symbol)
      .sort()
    res.json(allTickers)
  } catch (error) {
    next(error)
  }
})

//get latest price for a stock
router.get('/:symbol', async (req, res, next) => {
  try {
    const ticker = req.params.symbol.toUpperCase()
    const singleTickerUrl = `${baseUrl}/stock/market/batch/?symbols=${ticker}&types=quote&filter=symbol,companyName,latestPrice&token=${iexToken}`
    const {data} = await axios.get(singleTickerUrl)
    const quote = data[req.params.symbol.toUpperCase()].quote
    res.json(quote)
  } catch (error) {
    next(error)
  }
})
