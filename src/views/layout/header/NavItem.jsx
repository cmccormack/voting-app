import React from 'react'
import PropTypes from 'prop-types'
import { Link, } from 'react-router-dom'

const NavItem = ({ hidden, to, content, updateAuth, }) => (
  <li hidden={hidden}>
    <Link
      className='sidenav-close'
      onClick={updateAuth}
      to={to}
    >
      {content}
    </Link>
  </li>
)

NavItem.propTypes = {
  hidden: PropTypes.bool,
  to: PropTypes.string,
  content: PropTypes.string,
  updateAuth: PropTypes.func,
}

NavItem.defaultProps = {
  hidden: false,
  to: '#',
  content: 'item',
}

export default NavItem