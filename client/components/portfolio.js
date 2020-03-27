import React from 'react'
import {connect} from 'react-redux'
import {
  getPortfolio,
  getSymbols,
  getSymbolData,
  buyStock,
  getCash,
  buyStockTransact
} from '../store'
//import Buyform from './buy-form'

class Portfolio extends React.Component {
  constructor() {
    super()
    this.state = {
      ticker: '',
      quantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getPortVal = this.getPortVal.bind(this)
  }

  async componentDidMount() {
    await this.props.getPortfolio()
    await this.props.getSymbols()
    await this.props.getCash()
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault()
    const enteredStock = event.target.ticker.value
    const enteredQty = event.target.quantity.value

    const cash = await this.props.getCash()
    if (!this.props.symbols.includes(enteredStock.toUpperCase())) {
      alert('No such stock! Try again.')
    } else if (enteredQty === '') {
      alert('Must enter a quantity! Try again.')
    } else if (!Number.isInteger(+enteredQty)) {
      alert('Not a number!')
    } else {
      await this.props.getSymbolData(enteredStock)
      const symbolData = this.props.symbolData

      const symbol = symbolData.symbol
      const name = symbolData.companyName
      const price = +symbolData.latestPrice
      const quantity = +enteredQty

      if (price * quantity > +cash) {
        alert(`Not enough cash! You have $${cash} remaining`)
      } else {
        await this.props.buyStock(symbol, name, price, quantity)
        // await this.props.buyStockTransact(symbol, name, price, quantity)
        this.setState({
          ticker: '',
          quantity: ''
        })
      }
    }

    await this.props.getPortfolio()
    await this.props.getCash()
    console.log(this.props.portfolio)
  }

  getPortVal() {
    return this.props.portfolio.reduce((accumulator, stock) => {
      return accumulator + +stock.totalPrice
    }, 0)
  }

  render() {
    return (
      <div className="row">
        <div className="column left">
          <div>
            <h4>{`Portfolio ($${(this.getPortVal() * 100 / 100).toFixed(
              2
            )})`}</h4>
          </div>

          <div>
            <table>
              <tbody>
                <tr>
                  <td>Ticker</td>
                  <td>Shares</td>
                  <td>Value</td>
                </tr>

                {this.props.portfolio.map((stock, index) => (
                  <tr key={index}>
                    <td>{`${stock.symbol}`}</td>
                    <td>{`${stock.quantity}`}</td>
                    <td>{`$${(+stock.totalPrice * 100 / 100).toFixed(2)}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="column right">
          <div>
            <h4>Cash - {`$${(+this.props.cash * 100 / 100).toFixed(2)}`}</h4>
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input
                  name="ticker"
                  type="text"
                  placeholder="Symbol, e.g. AAPL"
                  value={this.state.ticker}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <input
                  name="quantity"
                  type="text"
                  placeholder="Quantity"
                  value={this.state.quantity}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <button type="submit">Buy</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  portfolio: state.portfolio,
  symbols: state.allSymbols,
  symbolData: state.singleSymbol,
  cash: state.cash
})

const mapDispatchToProps = dispatch => ({
  getPortfolio: () => dispatch(getPortfolio()),
  getSymbols: () => dispatch(getSymbols()),
  buyStock: (symbol, companyName, price, quantity) =>
    dispatch(buyStock(symbol, companyName, price, quantity)),
  getSymbolData: symbol => dispatch(getSymbolData(symbol)),
  getCash: () => dispatch(getCash()),
  buyStockTransact: (symbol, companyName, price, quantity) =>
    dispatch(buyStockTransact(symbol, companyName, price, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
