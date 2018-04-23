import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Spinner, IndeterminateProgressBar } from '../utils'

const Title = styled.h1`
  display: inline-block;
`

class LogoutPage extends Component {

  componentDidMount() {
    document.title = 'Votery | Logout'
    // Set slight delay so user can process a logout is occuring
    setTimeout(this.props.handleLogout, 500)
  }

  render() {
    document.title = "Votery | Logging Out..."
    return (
      !this.props.loggedIn
      ? <Redirect to="/login" />
      : (
        <div className="container center">
          <div className="row">
            <div className="col s12">
              <Title className="teal-text text-lighten-1">Logging Out...</Title>
            </div>
          </div>
          <div className="row">
            <div className="col s8 offset-s2">
              <IndeterminateProgressBar />
            </div>
          </div>
        </div>
      )
    )
  }
}

export default LogoutPage