import React from 'react'
import PropTypes from 'prop-types'

const IconLink = ({
  title='',
  href="#",
  icon,
  onClick,
}) => (
  <a 
    title={ title }
    href={ href }
    onClick={ onClick }
  >
    { icon }
  </a>
)

IconLink.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.object,
  ]),
  onClick: PropTypes.func,
}

IconLink.defaultProps = {
  title: '',
  href: '#',
  icon: null,
  onClick: () => { },
}

export default IconLink