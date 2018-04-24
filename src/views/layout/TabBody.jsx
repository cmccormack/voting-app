import React from 'react'
import PropTypes from 'prop-types'

const TabBody = ({ size, children, className, id, }) => (
  <div
    className={`col ${size} ${className}`}
    id={id}
  >
    {children}
  </div>
)

TabBody.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.string,
  children: PropTypes.element,
  className: PropTypes.string,
}

TabBody.defaultProps = {
  size: 's12',
  className: '',
}

export default TabBody