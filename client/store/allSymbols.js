import axios from 'axios'

/*ACTION TYPES*/

const GET_SYMBOLS = 'GET_SYMBOLS'

/*INITIAL STATE*/
const symbols = []

/*ACTION CREATORS*/

const gotSymbols = symbols => ({
  type: GET_SYMBOLS,
  symbols
})

/*THUNK CREATORS*/

export const getSymbols = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/symbols')
    dispatch(gotSymbols(data))
  } catch (error) {
    console.error(error)
  }
}

/*REDUCER*/

export default function(state = symbols, action) {
  switch (action.type) {
    case GET_SYMBOLS:
      return action.symbols
    default:
      return state
  }
}
