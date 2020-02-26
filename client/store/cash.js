import axios from 'axios'
import {REMOVE_USER} from './user'
/**
 * ACTION TYPES
 */
const GET_CASH = 'GET_CASH'

/**
 * INITIAL STATE
 */
const cash = 0

/**
 * ACTION CREATORS
 */
const gotCash = cash => ({type: GET_CASH, cash})

/**
 * THUNK CREATORS
 */

export const getCash = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users/cash')
    dispatch(gotCash(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = cash, action) {
  switch (action.type) {
    case GET_CASH:
      return action.cash
    case REMOVE_USER:
      return 0
    default:
      return state
  }
}
