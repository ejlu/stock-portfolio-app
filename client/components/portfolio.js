import React from 'react'
import {connect} from 'react-redux'
import {getPortfolio, getSymbols, getSymbolData, buyStock} from '../store'
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
  }

  async componentDidMount() {
    await this.props.getPortfolio()
    await this.props.getSymbols()
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault()

    const enteredStock = this.state.ticker
    await this.props.getSymbolData(enteredStock)

    const symbolData = this.props.symbolData
    const symbol = symbolData.symbol
    const name = symbolData.companyName
    const price = symbolData.latestPrice
    const quantity = +this.state.quantity

    await this.props.buyStock(symbol, name, price, quantity)
  }

  render() {
    return (
      <div className="row">
        <div className="column left">
          <h4>Portfolio</h4>
          {this.props.portfolio.map(stock => (
            <div key={stock.symbol}>{stock.symbol}</div>
          ))}
        </div>
        <div className="column right">
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
  portfolio: state.portfolio,
  symbols: state.allSymbols,
  symbolData: state.singleSymbol
})

const mapDispatchToProps = dispatch => ({
  getPortfolio: () => dispatch(getPortfolio()),
  getSymbols: () => dispatch(getSymbols()),
  buyStock: (symbol, companyName, price, quantity) =>
    dispatch(buyStock(symbol, companyName, price, quantity)),
  getSymbolData: symbol => dispatch(getSymbolData(symbol))
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
