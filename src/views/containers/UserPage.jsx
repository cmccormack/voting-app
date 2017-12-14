import React, { Component } from 'react'

const User = props => (
  props.loggedIn
  ? <h1>User Page</h1>
  : <div></div>
)

export default User