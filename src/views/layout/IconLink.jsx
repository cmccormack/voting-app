import React, { Component, } from 'react'
import styled from 'styled-components'

const IconLink = ({title='', href="#", Icon, ...props}) => (
  <a 
    title={ title }
    href={ href }
    onClick={ props.onClick }
  >
    { Icon }
  </a>
)

export default IconLink