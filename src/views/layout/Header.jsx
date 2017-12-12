import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

class Header extends Component {

  constructor(props){
    super(props)
  }

  render() {

    const {loggedIn, user, handleLogout} = this.props
    console.log(user)

    const links = (
      <ul className="right hide-on-med-and-down">
        <li hidden={!loggedIn}><Link to="/user">{`Hello, ${user}!`}</Link></li>
        <li><Link to="/main">Main</Link></li>
        <li hidden={loggedIn}><Link to="/login">Login</Link></li>
        <li hidden={loggedIn}><Link to="/register">Register</Link></li>
        <li hidden={!loggedIn}><a onClick={handleLogout}>Logout</a></li>
      </ul>
    )

    return (
      <nav className="row teal lighten-1">
        <div className="nav-wrapper">
          <div className="col s12">
            <Link to='/main' className="brand-logo">Votery</Link>
            <div className="right">
              { user && <span></span> }
              { links }
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header