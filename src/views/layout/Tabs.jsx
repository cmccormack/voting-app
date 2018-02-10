import React, { Component } from 'react'
import styled from 'styled-components'

import { Tab } from './'


const TabGroup = styled.ul`
  li.indicator {
    background-color: ${props => props.indicatorColor};
  }
`


class Tabs extends Component {
  
  componentDidMount(){
    $(document).ready(function () {
      $('ul.tabs').tabs({swipeable: true});
    });
  }
  render(){

    const { children, className = '', color = '', ...props } = this.props

    return(
      <div className="row">
        <div className="col s12">
          <TabGroup className="tabs" indicatorColor="#00897b">
            <Tab
              color="teal-text"
              disabled={false}
              disabledColor="teal-text text-lighten-3"
              target="#polls"
              size="s3">
                {'My Polls'}
            </Tab>
            <Tab
              color="teal-text"
              disabled={false}
              disabledColor="teal-text text-lighten-3"
              target="#settings"
              size="s3">
              {'Settings'}
            </Tab>
          </TabGroup>
        </div>
        <div id="polls" className="col s12">My Polls</div>
        <div id="settings" className="col s12">My Settings</div>
      </div>
    )
  }
}

export default Tabs