import React, { Component } from 'react'

const Login = (props) => (
  <div>
    <h1>Login</h1>
    <form id='login_form' action='/login'method='post'>
      <label htmlFor='username'>Username: </label>
      <input placeholder='username' name='username' id='input_username' /><br/>
      <label htmlFor='password'>Password: </label>
      <input placeholder='password' name='password' id='input_password' /><br />
      <button type='submit'>Submit</button>
    </form>
  </div>
)

export default Login