import React, { Component } from 'react'

class UserPage extends Component {

  render() {
    console.log(this.props)

    return (
      !this.props.loggedIn
      ? (
        <h3>User not currently logged in, redirecting to login page...</h3>
      )
      : (
        <h1>User Page</h1>
      )
    )
  }

}

export default UserPage