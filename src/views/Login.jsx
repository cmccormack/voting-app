import React, { Component } from 'react'

class Login extends Component {

  validateLogin(){
    fetch()
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form id='login_form' action='/login'method='post'>
          <label for='username'>Username: </label>
          <input placeholder='username' name='username' id='input_username' /><br/>
          <label for='password'>Password: </label>
          <input placeholder='password' name='password' id='input_password' /><br />
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default Login