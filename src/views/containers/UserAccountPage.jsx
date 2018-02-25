import React, { Component } from 'react'

import { UserAccountForm } from '../components'

class UserAccountPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: "",
      loaded: false,
      polls: []
    }
  }

  updateTabs() {
    $(document).ready(() => { $('ul.tabs').tabs() })
  }

  componentDidMount() {
    this.updateTabs()
    fetch(`/api/${this.props.user}/polls`, {
      method: "GET",
      cache: "default",
      credentials: "same-origin"
    })
      .then(res => res.json()).then(({success, polls, message}) => {

        if (!success) {
          return this.setState({ error: message})
        }

        this.setState({ polls, loaded: true })
      })
      .catch(console.error)
  }

  componentDidUpdate() {
    this.updateTabs()
  }

  render() {

    const { loaded, polls, error, user } = this.state
    const { location } = this.props

    const title = "My Account"
    const footer = "Some Footer Text Here"

    return (
      <UserAccountForm
        error={ error }
        footer={ footer }
        loaded={ loaded }
        location={ location }
        polls={ polls }
        title={ title }
        updateTabs={ this.updateTabs }
        user= { user }
      />
    )
  }

}

export default UserAccountPage