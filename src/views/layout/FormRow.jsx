import React, { Component } from 'react'
import styled from 'styled-components'

const FormRowStyled = styled.div`
  position: relative;
`

const FormRow = ({ align="", children, className }) => (
  <FormRowStyled className={`row ${align} ${className}`}>
    { children }
  </FormRowStyled>
)

export default FormRow