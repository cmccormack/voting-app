import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'

class Header extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    $('.button-collapse').sideNav()
  }

  render() {

    const {loggedIn, user, handleLogout} = this.props

    const links = (
      <ul className="right hide-on-med-and-down">
        <li hidden={!loggedIn}><Link to="/user">{`Hello, ${user}!`}</Link></li>
        <li><Link to="/main">Main</Link></li>
        <li hidden={loggedIn}><Link to="/login">Login</Link></li>
        <li hidden={loggedIn}><Link to="/register">Register</Link></li>
        <li hidden={!loggedIn}><Link to="/logout">Logout</Link></li>
      </ul>
    )

    const sidenav = (
      <ul className="side-nav" id="sideNav">
        <li hidden={!loggedIn}><Link to="/user">{`Hello, ${user}!`}</Link></li>
        <li><Link to="/main">Main</Link></li>
        <li><div className="divider"></div></li>
        <li hidden={loggedIn}><Link to="/login">Login</Link></li>
        <li hidden={loggedIn}><Link to="/register">Register</Link></li>
        <li hidden={!loggedIn}><a onClick={handleLogout}>Logout</a></li>
      </ul>
    )

    return (
      <div>
        { sidenav }
        <div className="navbar-fixed row">
          <nav className="teal lighten-1">
            <div className="nav-wrapper">
              <div className="col s12">
                <Link to='/main' className="brand-logo">Votery</Link>
                { links }
                <a
                  className="button-collapse right hide-on-large"
                  href="#"
                  data-activates="sideNav"
                >
                  <i className="material-icons">menu</i>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

export default Header