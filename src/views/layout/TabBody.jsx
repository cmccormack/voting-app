import React, { Component } from 'react'
import styled from 'styled-components'

const TabBody = ({children, className="", id, size="s12"}) => (
    <div id={id} className={`col ${size} ${className}`}>
      { children } 
    </div>
  )

export default TabBody