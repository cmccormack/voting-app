import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'

const NavItem = ({ hidden, to, content }) => (
  <li hidden={hidden}><Link to={to}>{content}</Link></li>
)

const Nav = ({ className, id, items }) => (
  <ul className={className} id={id}>
    {items.map((item, i) => (
      <NavItem {...item} key={item.content} />
    ))}
  </ul>
)

class Header extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    $('.button-collapse').sideNav()
  }

  render() {

    const {loggedIn, user, handleLogout} = this.props

    const linksold = (
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




    const links = [
      { hidden: !loggedIn, to: '/user', content: `Hello, ${user}!` },
      { hidden: false, to: '/main', content: 'Main' },
      { hidden: loggedIn, to: '/login', content: 'Login' },
      { hidden: loggedIn, to: '/register', content: 'Register' },
      { hidden: !loggedIn, to: '/logout', content: 'Logout' }
    ]

    return (
      <header>
        <Nav className="side-nav" id="side-nav" items={links} />
        <div className="navbar-fixed row">
          <nav className="teal lighten-1">
            <div className="nav-wrapper">
              <div className="col s12">
                <Link to='/main' className="brand-logo">Votery</Link>
                <Nav
                  className="right hide-on-med-and-down"
                  id="top-nav"
                  items={links}
                />
                <a
                  className="button-collapse right hide-on-large"
                  href="#"
                  data-activates="side-nav"
                >
                  <i className="material-icons">menu</i>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>
    )
  }
}

export default Header