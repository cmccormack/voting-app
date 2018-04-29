import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const IconStyled = styled.i`
  font-size: ${props => props.fontSize};
`

const Icon = ({
  children,
  className,
  color,
  ...props
}) => (

  <IconStyled
    className={ classNames(className, color) }
    { ...props }
  >
    { children }
  </IconStyled>

)

Icon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.any,
}

Icon.defaultProps = {
  className: '',
  color: '',
}

export default Icon