import React, { Component, } from 'react'
import { Link, } from 'react-router-dom'
import { LoginForm, } from '../components'
import PropTypes from 'prop-types'

class LoginPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      error: "",
    }
    this._isMounted = false

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  handleInputChange(e) {
    let newState = {
      [e.target.name]: e.target.value,
    }
    if (e.target.name === 'username') {
      newState.error = ''
    }
    this.setState(newState)
  }

  handleSubmit(event) {
    event.preventDefault()

    const { username, password, } = this.state
    const { updateAuthStatus, } = this.props
    const body = { username, password, }

    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      cache: "default",
      credentials: "same-origin",
      body: JSON.stringify(body),
    })
    .then(res => res.json()).then(data => {

      // Return early if component not mounted
      if (!this._isMounted) return

      // Response from login attempt
      updateAuthStatus(response => {
        if (!response.isAuthenticated || !data.success) {
          this.setState({ error: data.message, })
        }
      })
    })
    .catch(console.error)
  }

  render() {

    document.title = "Votery | Login"

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m10 offset-m1 xl8 offset-xl2">
            <LoginForm
              handleInputChange={this.handleInputChange}
              handleSubmit={this.handleSubmit}
              title="Log in to Votery!"
              footer={<div>
                {"Don't have an account?  "}
                <Link to="/register">Register!</Link>
              </div>}
              { ...this.state }
            />
          </div>
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
  updateAuthStatus: PropTypes.func,
}

export default LoginPage