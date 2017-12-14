import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { Spinner } from '../layout'

class LogoutPage extends Component {

  componentDidMount() {
    document.title = 'Votery | Logout'
    setTimeout(this.props.handleLogout, 500)
  }

  render() {
    return (
      this.props.loggedIn
      ? <div>Logging Out...<Spinner /></div>
      : <Redirect to="/login" />
    )
  }
}

export default LogoutPage