import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Col = ({
  align,
  children,
  className,
  size,
}) => (
  <div
    className={ classNames('col', align+'-align', size, className) }
  >
    {children}
  </div>
)

Col.propTypes = {
  align: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  size: PropTypes.string,
}

Col.defaultProps = {
  align: 'center',
  className: '',
  size: 's12',
}

export default Col