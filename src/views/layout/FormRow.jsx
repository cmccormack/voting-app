import React, { Component } from 'react'
import styled from 'styled-components'

const FormRowStyled = styled.div`
  position: relative;
`

const FormRow = ({ align="", children }) => (
  <FormRowStyled className={`row ${align}`}>
    { children }
  </FormRowStyled>
)

export default FormRow