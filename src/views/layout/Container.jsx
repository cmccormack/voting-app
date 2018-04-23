import React from 'react'
import PropTypes from 'prop-types'

const Container = ({ className = "", children, }) => (
  <div className={`container ${className}`}>
    {children}
  </div>
)

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}

Container.defaultProps = {
  className: '',
}

export default Container