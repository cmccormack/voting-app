import { Component, } from 'react'
import PropTypes from 'prop-types'

class LoaderWithTimeout extends Component {

  constructor(props) {
    super(props)
    this.state = {
      renderComponent: this.props.renderLoading,
    }
    this.timeoutID = 0
  }

  componentDidMount() {
    const {
      renderFailed,
      timeout,
    } = this.props

    this.timeoutID = setTimeout(() => {
      console.error('Loading timed out...')
      this.setState({
        renderComponent: renderFailed,
      })
    }, timeout)

  }

  render() {

    const {
      loaded,
      renderSuccess,
    } = this.props

    loaded && clearInterval(this.timeoutID)

    return (
      loaded
      ? renderSuccess
      : this.state.renderComponent
    )
  }
}

LoaderWithTimeout.propTypes = {
  loaded: PropTypes.bool,
  renderFailed: PropTypes.element.isRequired,
  renderLoading: PropTypes.element.isRequired,
  renderSuccess: PropTypes.element.isRequired,
  timeout: PropTypes.number,
}

LoaderWithTimeout.defaultProps = {
  loaded: false,
  timeout: 1000,
}

export default LoaderWithTimeout