import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Tab = ({
  active,
  children,
  className,
  color,
  disabled,
  disabledColor,
  size,
  target,
}) => (
  <li className={`tab col ${size} ${disabled ? 'disabled' : ''}`}>
    <a
      className={ classNames(
        {'active': active, },
        { [disabledColor]: disabled, },
        { [color]: !disabled, },
        className,
      )}
      href={target}
    >
      {children}
    </a>
  </li>
)

Tab.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  disabledColor: PropTypes.string,
  size: PropTypes.string,
  target: PropTypes.string,
}
Tab.defaultProps = {
  active: true,
  className: '',
  color: '',
  disabled: false,
  disabledColor: '',
  size: 'col s3',
  target: '#',
}

export default Tab