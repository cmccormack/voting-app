import React, { Component, } from 'react'
import PropTypes from 'prop-types'

import { UserPollsForm, } from '../components'
import { getColorsIncrementHue, } from '../../utils/colors'

class UserPollsPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: "",
      footer: this.props.footer,
      loading: true,
      polls: [],
      title: this.props.title,
      apiTimeout: 5 * 1000, // 5 seconds
    }

    this._isMounted = false
    this.chartColorOptions = {
      saturation: 40,
      lightness: 60,
      increment: 20,
    }

    this.getPolls = this.getPolls.bind(this)
  }

  componentDidMount() {
    this._isMounted = true
    this.getPolls()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getPolls() {
    const { user, } = this.props
    fetch(`/api/${user}/polls`, {
      method: "GET",
      cache: "default",
      credentials: "same-origin",
    })
      .then(res => res.json()).then(({success, polls, message,}) => {

        // Return early if Component unmounted or loading timer expired
        if (!this._isMounted) return

        if (!success) {
          return this.setState({ error: message,})
        }

        const { increment, lightness, saturation, } = this.chartColorOptions
        this.setState({
          polls: polls.map(poll => {
            poll.choiceColors = getColorsIncrementHue(
              poll.seedColor,
              {
                length: poll.choices.length,
                increment,
                lightness,
                saturation,
              }
            )
            return poll
          }),
          loading: false,
          loadingFailed: false,
          title: polls.length > 0 
            ? this.state.title
            : `No polls found for user ${user}`,
        })
      })
      .catch(console.error)
  }

  render() {

    const { user, } = this.props
    
    document.title = `Votery | ${user || 'User'}'s Polls`

    return (
      <UserPollsForm
        { ...this.state }
        user={ user }
      />
    )
  }

}

UserPollsPage.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  user: PropTypes.string,
}

UserPollsPage.defaultProps = {
  error: '',
  footer: '',
  title: '',
  user: '',
}

export default UserPollsPage