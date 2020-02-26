import React from 'react'

export default class Buyform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ticker: '',
      quantity: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    console.log('>>>props:', this.props)
    event.preventDefault()
    const buyStock = this.props.buyStock
    const enteredStock = event.target.ticker.value
    const stockData = await this.props.getSymbolData(enteredStock)
    console.log('>>>entered data:', stockData)
    const symbol = stockData.symbol
    const name = stockData.companyName
    const price = stockData.latestPrice
    const quantity = +event.target.quantity.value

    await buyStock(symbol, name, price, quantity)
  }

  render() {
    return (
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
    )
  }
}
