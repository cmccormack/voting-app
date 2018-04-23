import React from 'react'
import PropTypes from 'prop-types'

const Row = ({ children, className, }) => (
  <div className={`row ${className}`}>
    {children}
  </div>
)

Row.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
}

Row.defaultProps = {
  className: '',
}

export default Row