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
    console.log('>>>buying...')
    console.log('>>>symbol:', symbol)
    console.log('>>>companyName:', companyName)
    console.log('>>>latestPrice:', latestPrice)
    console.log('>>>quantity:', quantity)
    const stock = {
      symbol,
      companyName,
      latestPrice,
      quantity
    }
    const {data} = await axios.post('/api/portfolio/buy', stock)
    console.log('>>>buying stock...', data)
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
      console.log('>>>in reducer, buy:', action.stock)
      return [...state, action.stock]
    }
    default:
      return state
  }
}
