import React from 'react'
import {connect} from 'react-redux'
import {getTransactions} from '../store'

class Transaction extends React.Component {
  async componentDidMount() {
    await this.props.getTransactions()
  }
  render() {
    return (
      <div>
        <h4>Transactions</h4>
        <div>
          {this.props.transactions && this.props.transactions.length ? (
            this.props.transactions.map((transaction, index) => (
              <div key={index}>{`BUY (${transaction.symbol}) - ${
                transaction.quantity
              } shares @ $${(100 * +transaction.price / 100).toFixed(2)}`}</div>
            ))
          ) : (
            <div>
              <h5>No transactions.</h5>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  transactions: state.transaction
})

const mapDispatchToProps = dispatch => ({
  getTransactions: () => dispatch(getTransactions())
})

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)
