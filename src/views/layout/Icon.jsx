import React, { Component, } from 'react'
import styled from 'styled-components'

const IconStyled = styled.i`
  font-size: ${props => props.fontSize};
`

const Icon = ({children, className='', color='', ...props}) => (

  <IconStyled
    className={`${className} ${color}`}
    { ...props }
  >
    { children }
  </IconStyled>

)

export default Icon