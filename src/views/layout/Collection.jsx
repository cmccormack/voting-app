import React from 'react'
import PropTypes from 'prop-types'

const Collection = ({ children, className, }) => (
  <ul className={`${className} collection with-header`}>
    { children }
  </ul>
)

Collection.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
}

Collection.defaultProps = {
  className: '',
}

export default Collection