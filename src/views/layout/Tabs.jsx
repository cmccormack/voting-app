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
            <Tab color="teal-text" disabled={false} disabledColor="teal-text text-lighten-3" target="#yourmomma" size="s3">Your momma</Tab>
            <li className="tab col s3"><a href="#test1">Test 1</a></li>
            <li className="tab col s3"><a className="active" href="#test2">Test 2</a></li>
            <li className="tab col s3 disabled"><a href="#test3">Disabled Tab</a></li>
            <li className="tab col s3"><a href="#test4">Test 4</a></li>
          </TabGroup>
        </div>
        <div id="yourmomma" className="col s12">Your momma</div>
        <div id="test1" className="col s12">Test 1</div>
        <div id="test2" className="col s12">Test 2</div>
        <div id="test3" className="col s12">Test 3</div>
        <div id="test4" className="col s12">Test 4</div>
      </div>
    )
  }
}

export default Tabs