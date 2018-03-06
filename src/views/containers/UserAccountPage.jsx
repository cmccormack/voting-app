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
    this._isMounted = false
    this.deletePoll = this.deletePoll.bind(this)
    this.deleteAccount = this.deleteAccount.bind(this)
  }


  updateTabs() {
    $(document).ready(() => { $('ul.tabs').tabs() })
  }


  deletePoll({ id, title }) {
    console.log(id, title)
    const confirmDelete = confirm(
      `Are you sure you want to delete the poll ${title}?`
    )

    if (!confirmDelete) return

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    fetch(`/api/poll/delete`, {
      method: "POST",
      headers: myHeaders,
      cache: "default",
      credentials: "same-origin",
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(({ success, message, poll }) => {
        if (!success) {
          return this.setState({ error: message })
        }
        this.getPolls()
        console.log(`Poll "${title}" deleted.`)
      })
  }

  deleteAccount() {
    const confirmDelete = confirm(
      `Are you sure you want to delete your account?`
    )

    if (!confirmDelete) return

    const { user } = this.props
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    fetch(`/api/user/delete`, {
      method: "POST",
      headers: myHeaders,
      cache: "default",
      credentials: "same-origin",
      body: JSON.stringify({ user })
    })
      .then(res => res.json())
      .then(({ success, message, user }) => {
        if (!success) {
          return this.setState({ error: message })
        }
        console.log(message)
        this.props.updateAuthStatus()
      })
  }

  getPolls() {
    fetch(`/api/${this.props.user}/polls`, {
      method: "GET",
      cache: "default",
      credentials: "same-origin"
    })
      .then(res => res.json()).then(({success, polls, message}) => {

        if (!this._isMounted) return
        if (!success) {
          return this.setState({ error: message})
        }

        this.setState({ polls, loaded: true })
      })
      .catch(console.error)
  }

  componentDidMount() {
    this._isMounted = true
    this.updateTabs()
    this.getPolls()
  }

  componentDidUpdate() {
    this.updateTabs()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {

    const { loaded, polls, error, user } = this.state
    const { location } = this.props

    const title = "My Account"
    const footer = "Some Footer Text Here"

    return (
      <UserAccountForm
        deletePoll={ this.deletePoll }
        deleteAccount={ this.deleteAccount }
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