import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'
import PropTypes from 'prop-types'


/*eslint-disable-next-line no-unused-vars*/
const StripProps = ({ color, hoverColor, ...props }) => {
  return <Link {...props} />
}

StripProps.propTypes = {
  color: PropTypes.string,
  hoverColor: PropTypes.string,
}

const StyledLink = styled(StripProps)`
  color: ${props => props.color};
  :hover {
    color: ${props => props.hoverColor};
  }
`

StyledLink.defaultProps = {
  color: "#DDD",
  hoverColor: "#FFF",
}


export const TextLink = styled(StyledLink)`
`

export const SocialLink = styled(StyledLink)`
  margin: 0 ${props => props.spacing};
`

export const Link = ({
  children,
  className,
  colorClass,
  ...props
}) => (
  <a
    className={ classNames(className, colorClass) }
    { ...props }
  >
    { children }
  </a>
)

Link.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  colorClass: PropTypes.string,
  href: PropTypes.string,
}

Link.defaultProps = {
  className: '',
  colorClass: '',
}
