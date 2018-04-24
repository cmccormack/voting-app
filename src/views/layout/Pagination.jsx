import React from 'react'
import PropTypes from 'prop-types'


const PageNum = ({
  active=false,
  activeClass='',
  children,
  className='',
  effectClass='',
  fontColorClass='',
  ...props
}) => {
  const classes = [
    className,
    fontColorClass,
    active ? '' : effectClass,
    !active ? '' : activeClass,
    active ? 'active' : '',
  ].join(' ')

  return (
    <li
      className={ classes }
      { ...props }
    >
      { children }
    </li>
  )
}

const Pagination = ({children, ...props}) => (
  <ul { ...props }>
    { children }
  </ul>
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
}

PageNum.defaultProps = {
  active: false,
  children: '',
  className: '',
  effectClass: '',
  fontColorClass: '',
}

Pagination.propTypes = {
  children: PropTypes.any,
}

export { Pagination, PageNum, }