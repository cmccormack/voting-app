import React from 'react'
import PropTypes from 'prop-types'

const IconLink = ({
  title='',
  href="#",
  Icon,
  onClick,
}) => (
  <a 
    title={ title }
    href={ href }
    onClick={ onClick }
  >
    { Icon }
  </a>
)

IconLink.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  Icon: PropTypes.func,
  onClick: PropTypes.func,
}

IconLink.defaultProps = {
  title: '',
  href: '#',
  Icon: null,
  onClick: () => { },
}

export default IconLink