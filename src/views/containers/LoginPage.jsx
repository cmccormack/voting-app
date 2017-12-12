import React, { Component } from 'react'
import styled from 'styled-components'

import { LoginForm } from '../components'

class LoginPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    const body = {
      username: this.state.username,
      password: this.state.password
    }
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    fetch("/login", {
      method: "POST",
      headers: myHeaders,
      cache: "default",
      credentials: "same-origin",
      body: JSON.stringify(body)
    })
      .then(res => res.json()).then(data => {
        // Response from login attempt
        console.log(data)
        this.props.updateLoggedIn(data.success)
      })
      .catch(err => { console.error(err) })
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m10 offset-m1 xl8 offset-xl2">
            <LoginForm
              handleInputChange={this.handleInputChange}
              handleSubmit={this.handleSubmit}
              { ...this.state }
            />
          </div>
        </div>
      </div>
    )
  }
}


export default LoginPage