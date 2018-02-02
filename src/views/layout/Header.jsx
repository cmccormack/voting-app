import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'

const NavItem = ({ hidden, to, content }) => (
  <li hidden={hidden}><Link to={to}>{content}</Link></li>
)

const NavItems = ({ className, id, items }) => (
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

    const links = [
      { hidden: !loggedIn, to: '/user', content: `Hello, ${user}!` },
      { hidden: false, to: '/main', content: 'Main' },
      { hidden: !loggedIn, to: '/new', content: 'New Poll' },
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
                <NavItems
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