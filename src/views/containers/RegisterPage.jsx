import React, { Component, } from 'react'
import PropTypes from 'prop-types'

import { Link, } from 'react-router-dom'
import { RegisterForm, } from '../components'

class RegisterPage extends Component {

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


  handleInputChange(e){
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

    const body = {
      username: this.state.username,
      password: this.state.password,
    }

    fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      cache: "default",
      credentials: "same-origin",
      body: JSON.stringify(body),
    })
    .then(res => res.json()).then(data => {

      // Return early if component not mounted
      if (!this._isMounted) return

      // Response from registration attempt
      this.props.updateAuthStatus( response => {
        if (!response.isAuthenticated || !data.success) {
          this.setState({error: data.message,})
        }
      })
    })
    .catch(console.error)
  }

  render() {

    document.title = "Votery | Register"

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m10 offset-m1 xl8 offset-xl2">
            <RegisterForm
              handleInputChange={ this.handleInputChange }
              handleSubmit={ this.handleSubmit }
              title="register an account with votery!"
              footer={<div>
                {'Already have an account?  '}
                <Link to="/login">Login!</Link> 
              </div>}
              { ...this.state }
            />
          </div>
        </div>
      </div>
    )
  }
}

RegisterPage.propTypes = {
  updateAuthStatus: PropTypes.func,
}

export default RegisterPage