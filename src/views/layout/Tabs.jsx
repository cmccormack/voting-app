import React, { PureComponent, } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const TabGroup = styled.ul`
  overflow-x: hidden;
  li.indicator {
    background-color: ${props => props.indicatorColor || 'none'};
  }
`

class Tabs extends PureComponent {

  render(){

    const {
      children,
      className,
      color,
      indicatorColor,
    } = this.props

    return(
      <div className={`col s12 ${className} ${color}`}>
        <TabGroup className="tabs" indicatorColor={indicatorColor}>
          { children }
        </TabGroup>
      </div>
    )
  }
}

Tabs.propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
  color: PropTypes.string,
  indicatorColor: PropTypes.string,
  

}

Tabs.defaultProps = {
  className: '',
  color: '',
  indicatorColor: '#00897b',
}

export default Tabs