import React, { Component } from 'react'
import styled from 'styled-components'

const TabBodyStyled = styled.div`
  padding-top: 20px !important;
  background-color: lightgreen;
`
const TabBody = ({children, id, size="s12"}) => (
    <TabBodyStyled id={id} className={`col ${size}`}>
      { children } 
    </TabBodyStyled>
  )

export default TabBody