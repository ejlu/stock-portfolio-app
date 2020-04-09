import React from 'react'

export default class Time extends React.Component {
  constructor() {
    super()
    this.state = {
      currDate: new Date()
    }
    this.convertToServerTimeZone = this.convertToServerTimeZone.bind(this)
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        currDate: this.convertToServerTimeZone(new Date())
      })
    }, 60000)
  }

  //https://stackoverflow.com/a/9070729
  convertToServerTimeZone(date) {
    //EST
    offset = -5.0

    utc = date.getTime() + date.getTimezoneOffset() * 60000

    return new Date(utc + 3600000 * offset)
  }

  render() {
    return (
      //UTC time
      <div>
        {this.state.currDate.getHours() >= 17 ? (
          <h6 className="marketClosed">Market closed</h6>
        ) : (
          ''
        )}
      </div>
    )
  }
}
