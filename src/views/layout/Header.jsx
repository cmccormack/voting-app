import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

class Header extends Component {

  constructor(props){
    super(props)
  }

  render() {

    const links = (
      <ul className="right hide-on-med-and-down">
        <li><Link to="/main">Main</Link></li>
        { 
          this.props.loggedIn && 
          <li><a onClick={this.props.handleLogout}>Logout</a></li>
        } 
        { !this.props.loggedIn && <li><Link to="/login">Login</Link></li> }
        { !this.props.loggedIn && <li><Link to="/register">Register</Link></li> }
      </ul>
    )

    return (
      <nav className="row teal lighten-1">
        <div className="nav-wrapper">
          <div className="col s12">
            <Link to='/main' className="brand-logo">Votery</Link>
            { links }
          </div>
        </div>
      </nav>
    )
  }
}

export default Header