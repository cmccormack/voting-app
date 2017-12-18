import React, { Component } from 'react'
import styled from 'styled-components'

import { GraphCard } from './layout'
import '../images/graph-placeholder.png'

const Row = ({ children }) => (
  <div className="row">
    { children }
  </div>
)

const Col = ({ size='s12', color='', children }) => (
  <div className={`col ${size} ${color}`}>
    { children }
  </div>
)

const MainWrapper = styled.div.attrs({
  className: "container center teal lighten-5 z-depth-4"
})`
  border-radius: 5px;
  margin-top: 80px;
  padding: 20px;
`

const Header = styled.h1`
  margin-bottom: '10px';
`
const SubHeaderWrapper = styled.div.attrs({
  className: "col s12 teal-text text-darken-1"
})`

`

const SubHeader = styled.h6`
`

class Main extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <MainWrapper>
        
        <Row>
          <Col size="s12" color="teal-text text-darken-3">
            <Header>Welcome to Votery!</Header>
          </Col>

          <Col size="s12" color="teal-text text-darken-1">
            <SubHeader>
              {'Check out some of the great user-submitted ' +
                'polls below, or create your own.'}
            </SubHeader>
            <SubHeader>
              {'See if the thing you like is better then ' + 
              'the thing that other person likes!'}
            </SubHeader>
          </Col>
        </Row>

        <Row>
          { Array(10).fill(1).map((v,i)=> (
            <Col size="s12 m6" key={v*i}>
              <GraphCard 
                title={'Card Title ' + i}
                content={
                  <img
                    className="responsive-img"
                    src="../images/graph-placeholder.png"
                  />
                }
                actions={'Some actions will go here'}
              />
            </Col>
          ))}
        </Row>
      </MainWrapper>
    )
  }
}

export default Main