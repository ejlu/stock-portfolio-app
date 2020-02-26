import axios from 'axios'

/*ACTION TYPES*/

const GET_SYMBOL_DATA = 'GET_SYMBOL_DATA'

/*INITIAL STATE*/
const symbolData = {}

/*ACTION CREATORS*/

const gotSymbolData = symbolData => ({
  type: GET_SYMBOL_DATA,
  symbolData
})

/*THUNK CREATORS*/

export const getSymbolData = symbol => async dispatch => {
  try {
    const {data} = await axios.get(`/api/symbols/${symbol.toUpperCase()}`)
    console.log('>>>getting symbol data...', data)
    dispatch(gotSymbolData(data))
  } catch (error) {
    console.error(error)
  }
}

/*REDUCER*/

export default function(state = symbolData, action) {
  switch (action.type) {
    case GET_SYMBOL_DATA:
      return action.symbolData
    default:
      return state
  }
}
