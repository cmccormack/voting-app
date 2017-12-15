import React, { Component } from 'react'

const UserPage = props => (
  props.loggedIn
  ? <h1>User Page</h1>
  : <div>User Not Logged In</div>
)

export default UserPage