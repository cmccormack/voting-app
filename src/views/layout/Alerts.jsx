import React, { Component } from 'react'
import styled from 'styled-components'

export const Alert = styled.div`
  text-align: center;
  display: ${props => props.show};
  border-radius: .25rem;
  padding: .75rem 1.25rem !important;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  
`

export const WarningAlert = Alert.extend`
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;
`