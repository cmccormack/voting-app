import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Spinner } from '../layout'

const Title = styled.h1`
  display: inline-block;
`

class LogoutPage extends Component {

  componentDidMount() {
    document.title = 'Votery | Logout'
    // Set slight delay so user can process a logout is occuring
    setTimeout(this.props.handleLogout, 10000)
  }

  render() {

    return (
      !this.props.loggedIn
      ? <Redirect to="/login" />
      : (
        <div className="container center">
          <Title>Logging Out...<Spinner /></Title>
        </div>
      )
    )
  }
}

export default LogoutPage