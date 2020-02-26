import axios from 'axios'

/*ACTION TYPES*/

const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const BUY_STOCK_TRANSACT = 'BUY_STOCK'

/*INITIAL STATE*/
const transactions = []

/*ACTION CREATORS*/

const gotTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions
})

const boughtStockTransact = stock => ({
  type: BUY_STOCK_TRANSACT,
  stock
})

/*THUNK CREATORS*/

export const getTransactions = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/transactions')
    dispatch(gotTransactions(data))
  } catch (error) {
    console.error(error)
  }
}

export const buyStockTransact = (
  symbol,
  companyName,
  latestPrice,
  quantity
) => async dispatch => {
  try {
    const transaction = {
      symbol,
      companyName,
      latestPrice,
      quantity
    }
    const {data} = await axios.post('/api/transactions/buy', transaction)
    dispatch(boughtStockTransact(data))
  } catch (error) {
    console.error(error)
  }
}

/*REDUCER*/

export default function(state = transactions, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transactions
    case BUY_STOCK_TRANSACT:
      return [...state, action.stock]
    default:
      return state
  }
}
