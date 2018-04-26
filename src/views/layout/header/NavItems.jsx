import React from 'react'
import PropTypes from 'prop-types'

import { NavItem, } from './'

const NavItems = ({
  children,
  className,
  id,
  updateAuth,
}) => (
  <ul
    className={className}
    id={id}
  >
    {
      children.map( item => (
        <NavItem
          {...item}
          key={item.content}
          updateAuth={updateAuth}
        />
      ))
    }
  </ul>
)

NavItems.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.array,
  updateAuth: PropTypes.func,
}

NavItems.defaultProps = {
  className: '',
  id: '',
  children: [],
}

export default NavItems