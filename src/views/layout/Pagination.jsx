import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'


const PageNum = ({
  active,
  activeClass,
  children,
  className,
  effectClass,
  fontColorClass,
  onClick,
}) => (
  <li
    className={ classNames(
      className,
      fontColorClass,
      { [effectClass]: !active, },
      { [activeClass]: active, },
      { 'active': active, }
    )}
    onClick={ onClick }
  >
    { children }
  </li>
)

PageNum.propTypes = {
  active: PropTypes.bool,
  activeClass: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  className: PropTypes.string,
  effectClass: PropTypes.string,
  fontColorClass: PropTypes.string,
  onClick: PropTypes.func,
}

PageNum.defaultProps = {
  active: false,
  activeClass: '',
  children: '',
  className: '',
  effectClass: '',
  fontColorClass: '',
}


const Pagination = ({
  children,
  ...props
}) => (
  <ul {...props}>
    { children }
  </ul>
)

Pagination.propTypes = {
  children: PropTypes.any,
}

export { Pagination, PageNum, }