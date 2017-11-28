import React, { Component } from 'react'

class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      passwordConfirm: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event){
    const target = event.target
    this.setState({
      [target.name]: target.value
    }, () => console.log(this.state))
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state)
    console.log('Submitted!')
    const body = JSON.stringify({
      username: this.state.username,
      password: this.state.password
    })


    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    fetch('/register', {
      method: 'POST',
      headers: myHeaders,
      cache: 'default',
      body: body
    })
    .then(res => res.json()).then(data => {console.log(data)})
    .catch(err => { console.error(err) })
  }

  render() {

    const match = this.state.password === this.state.passwordConfirm
    const match_symbol = match
      ? <span id='password_match' style={{ color: 'green' }}>{'✔'}</span>
      : <span id='password_match' style={{ color: 'red' }}>{'✘'}</span>

    return (
      <div>
        <h1>Register</h1>
        <form id='login_form' onSubmit={this.handleSubmit}>
    
          <label htmlFor='username'>Username: </label>
          <input
            id='input_username'
            name='username'
            onChange={this.handleInputChange}
            placeholder='username'
            type='text'
            value={this.state.username}
          />
          <br />
    
          <label htmlFor='password'>Password: </label>
          <input
            id='input_password'
            name='password'
            onChange={this.handleInputChange}
            placeholder='password'
            type='password'
            value={this.state.password}
          />
          <br />
    
          <label htmlFor='passwordConfirm'>Confirm Password: </label>
          <input
            id='input_password_confirm'
            name='passwordConfirm'
            onChange={this.handleInputChange}
            placeholder='password'
            type='password'
            value={this.state.passwordConfirm}
          />{match_symbol}
          <br />
    
          <button type='submit'>Submit</button>
    
        </form>
      </div>
    )
  }
}


export default Register