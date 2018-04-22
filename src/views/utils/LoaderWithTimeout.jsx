import React, { Component } from 'react'

class APILoaderWithTimeout extends Component {

  constructor(props) {
    super(props)
    this.state = {
      renderComponent: this.props.renderLoading
    }
    this.timeoutID = 0
  }

  componentDidMount() {
    const { renderFailed, timeout, } = this.props

    this.timeoutID = setTimeout(() => {
      console.log('Loading timed out...')
      this.setState({
        renderComponent: renderFailed
      })
    }, timeout)

  }

  render() {

    this.props.loaded && clearInterval(this.timeoutID)

    return this.props.loaded
      ? this.props.renderSuccess
      : this.state.renderComponent
  }

}

export default APILoaderWithTimeout