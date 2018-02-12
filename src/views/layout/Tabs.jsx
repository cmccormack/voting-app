import React, { Component } from 'react'
import styled from 'styled-components'

import { Tab } from './'


const TabGroup = styled.ul`
  li.indicator {
    background-color: ${props => props.indicatorColor || 'none'};
  }
`

class Tabs extends Component {

  render(){

    const {
      children,
      className = '',
      color = '',
      indicatorColor,
      ...props
    } = this.props

    return(
      <div className={`col s12 ${className}`}>
        <TabGroup className="tabs" indicatorColor={indicatorColor}>
          { children }
        </TabGroup>
      </div>
    )
  }
}

export default Tabs