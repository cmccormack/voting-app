import React, { Component } from 'react'
import styled, {keyframes} from 'styled-components'

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(.75)
  }
  50% {
    /* opacity: .5; */
    transform: scale(1.25)
  }
  100% {
    opacity: 1;
    transform: scale(1)
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: scale(1)
  }
  100% {
    opacity: 0;
    transform: scale(.25)
  }
`

export const Alert = styled.div`
  text-align: center;
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  border-radius: .25rem;
  padding: .75rem 1.25rem !important;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  animation: .5s ${props => props.show ? fadeIn : fadeOut} ease-out;
`

export const WarningAlert = Alert.extend`
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;
`