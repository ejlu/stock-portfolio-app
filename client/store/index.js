import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import portfolio from './portfolio'
import allSymbols from './allSymbols'
import singleSymbol from './singleSymbol'
import cash from './cash'
import transaction from './transaction'

const reducer = combineReducers({
  user,
  portfolio,
  allSymbols,
  singleSymbol,
  cash,
  transaction
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './portfolio'
export * from './allSymbols'
export * from './singleSymbol'
export * from './cash'
export * from './transaction'
