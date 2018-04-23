import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { RegisterForm } from '../components'

class RegisterPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      error: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }


  handleInputChange(e){
    let newState = {
      [e.target.name]: e.target.value
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
      password: this.state.password
    }
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    fetch("/register", {
      method: "POST",
      headers: myHeaders,
      cache: "default",
      credentials: "same-origin",
      body: JSON.stringify(body)
    })
      .then(res => res.json()).then(data => {
        // Response from registration attempt
        this.props.updateAuthStatus( response => {
          if (!response.isAuthenticated || !data.success) {
            this.setState({error: data.message})
          }
        })
      })
      .catch(console.error)
  }

  componentDidMount() {
    document.title = 'Votery | Register'
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


export default RegisterPage