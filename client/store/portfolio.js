import axios from 'axios'

/*ACTION TYPES*/

const GET_PORTFOLIO = 'GET_PORTFOLIO'
const BUY_STOCK = 'BUY_STOCK'

/*INITIAL STATE*/
const portfolio = []

/*ACTION CREATORS*/

const gotPortfolio = portfolio => ({
  type: GET_PORTFOLIO,
  portfolio
})

const boughtStock = stock => ({
  type: BUY_STOCK,
  stock
})

/*THUNK CREATORS*/

export const getPortfolio = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/portfolio')
    dispatch(gotPortfolio(data))
  } catch (error) {
    console.error(error)
  }
}

export const buyStock = (
  symbol,
  companyName,
  latestPrice,
  quantity
) => async dispatch => {
  try {
    const stock = {
      symbol,
      companyName,
      latestPrice,
      quantity
    }
    const {data} = await axios.post('/api/portfolio/buy', stock)
    await axios.post('/api/transactions/buy', stock)
    dispatch(boughtStock(data))
  } catch (error) {
    console.error(error)
  }
}

/*REDUCER*/

export default function(state = portfolio, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return action.portfolio
    case BUY_STOCK: {
      let newEntry = action.stock
      const existingIndex = state.findIndex(
        stock => stock.symbol === action.stock.symbol
      )
      console.log('>>>prev state:', state)
      if (existingIndex !== -1) {
        let existingStock = state[existingIndex]
        existingStock.quantity = +action.stock.quantity
        existingStock.price = +action.stock.price
        existingStock.totalPrice = +action.stock.totalPrice
        console.log('>>>new state:', state)
        return [...state]
      } else {
        return [...state, newEntry]
      }
    }
    default:
      return state
  }
}
