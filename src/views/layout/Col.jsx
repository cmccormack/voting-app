import React from 'react'
import PropTypes from 'prop-types'

const Col = ({
  size,
  children,
  className,
}) => (
  <div
    className={`col ${size} ${className}`}
  >
    {children}
  </div>
)

Col.propTypes = {
  size: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
}

Col.defaultProps = {
  size: 's12',
  className: '',
}

export default Col