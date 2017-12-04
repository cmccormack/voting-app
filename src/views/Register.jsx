import React, { Component } from 'react'

class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event){
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
    myHeaders.append('Content-Type', 'application/json')
    fetch('/register', {
      method: 'POST',
      headers: myHeaders,
      cache: 'default',
      body: JSON.stringify(body)
    })
    .then(res => res.json()).then(data => {console.log(data)})
    .catch(err => { console.error(err) })
  }

  render() {

    return (
      <div>
        <h1>Register</h1>
        <form id='login_form' onSubmit={this.handleSubmit}>
    
          <label htmlFor='username'>Username: </label>
          <input
            id='input_username'
            name='username'
            onChange={this.handleInputChange}
            placeholder='Username'
            type='text'
            value={this.state.username}
          />
          <br />
    
          <label htmlFor='password'>Password: </label>
          <input
            id='input_password'
            name='password'
            onChange={this.handleInputChange}
            placeholder='Password'
            required
            type='password'
            value={this.state.password}
          />
          <br />
    
          <button type='submit'>Submit</button>
    
        </form>
      </div>
    )
  }
}


export default Register