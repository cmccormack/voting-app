import React, { Component } from 'react'

import { UserPollsForm } from '../components'
import { getRandomHue, getColorsIncrementHue } from '../../utils/colors'

class UserPollsPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: "",
      footer: this.props.footer,
      loading: true,
      polls: [],
      title: this.props.title,
      apiTimeout: 5 * 1000 // 5 seconds
    }
    this._isMounted = false
    this.getPolls = this.getPolls.bind(this)
  }

  getPolls() {
    const { user } = this.props
    fetch(`/api/${user}/polls`, {
      method: "GET",
      cache: "default",
      credentials: "same-origin"
    })
      .then(res => res.json()).then(({success, polls, message}) => {
        console.log('in getPolls .then')
        // Return early if Component unmounted or loading timer expired
        if (!this._isMounted) return

        if (!success) {
          return this.setState({ error: message})
        }
        console.log(polls.length > 0)
        this.setState({
          polls: polls.map(poll => {
            poll.choiceColors = getColorsIncrementHue(
              getRandomHue(),
              {
                length: poll.choices.length,
                increment: 20,
                saturation: 60,
              }
            )
            return poll
          }),
          loading: false,
          loadingFailed: false,
          title: polls.length > 0 
            ? this.state.title
            : `No polls found for user ${user}`
        })
      })
      .catch(console.error)
  }

  componentDidMount() {
    this._isMounted = true
    this.getPolls()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {

    const { user, } = this.props

    return (
      <UserPollsForm
        { ...this.state }
        user={ user }
      />
    )
  }

}

export default UserPollsPage