import React, { Component } from 'react'
import styled from 'styled-components'

const Tab = ({
  active = active ? 'active' : '',
  children,
  className = '',
  color = '',
  disabledColor = '',
  disabled=false,
  size='col s3',
  target='#',
  ...props
}) => (
  <li className={`tab col ${size} ${disabled ? 'disabled' : ''}`}>
    <a className={`${active} ${disabled ? disabledColor : color}`} href={target}>
      {children}
    </a>
  </li>
) 

export default Tab