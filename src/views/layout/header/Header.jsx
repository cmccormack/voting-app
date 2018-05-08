import React, { Component, } from 'react'
import { Link, } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { NavItems, } from './'

class Header extends Component {

  componentDidMount() {
    $('.button-collapse').sideNav({closeOnClick: true,})
  }

  render() {

    const {
      brand,
      brandAlignClass,
      brandTo,
      children,
      tribarClass,
      links,
      navColorClass,
    } = this.props

    return (
      <header>
        <NavItems className="side-nav" id="side-nav">{ links }</NavItems>
        <div className="navbar-fixed row">
          <nav className={ navColorClass }>
            <div className="nav-wrapper">
              <div className="col s12">
                <Link
                  to={ brandTo }
                  className={classNames("brand-logo", brandAlignClass)}
                >
                  { brand }
                </Link>
                { children }
                <a
                  className={classNames(
                    "button-collapse hide-on-large",
                    tribarClass
                  )}
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

Header.propTypes = {
  brand: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  brandAlignClass: PropTypes.string,
  brandTo: PropTypes.string,
  children: PropTypes.element,
  tribarClass: PropTypes.string,
  links: PropTypes.array,
  navColorClass: PropTypes.string,
  navItemsAlignClass: PropTypes.string,
}

Header.defaultProps = {
  brand: 'Brand',
  brandAlignClass: 'left',
  brandTo: '#',
  tribarClass: 'right',
  links: [],
  navColorClass: '',
}

export default Header