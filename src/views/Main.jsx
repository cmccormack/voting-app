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
  className: props => props.color
})`
  margin: 40px 0;
`

const SubHeader = styled.h6`
`

class Main extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      polls: []
    }
  }

  componentDidMount() {
    fetch('/polls', {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json()).then((polls) => {
        // console.log(`polls: ${JSON.stringify(data)}`)
        this.setState({ polls, loading: false })
      })
  }


  render() {

    const title = (
      <Row>
        <Col size="s12" color="teal-text text-darken-3">
          <Header>Welcome to Votery!</Header>
        </Col>

        <Col size="s12">
          <SubHeaderWrapper color="teal-text text-darken-1">
            <SubHeader>
              {'Check out some of the great user-submitted ' +
                'polls below, or create your own.'}
            </SubHeader>
            <SubHeader>
              {'See if the thing you like is better then ' +
                'the thing that other person likes!'}
            </SubHeader>
          </SubHeaderWrapper>
        </Col>
      </Row>
    )

    const loadingDisplay = (
        <h1 className="teal-text text-darken-3">Loading...</h1>
    )

    const body = (
      <Row>
        { this.state.polls.map(({title, shortName, user}) => (
          <Col size="s12 m6" key={shortName}>
            <GraphCard
              title={title}
              content={
                <img
                  className="responsive-img"
                  src="../images/graph-placeholder.png"
                />
              }
              actions={`Created by ${user}`}
            />
          </Col>
        ))}
      </Row>
    )

    return (
      <MainWrapper>
        { title }
        {
          this.state.loading 
            ? loadingDisplay 
            : this.state.polls
              ? body
              : (<h1>No polls found.  Be the first to create one!</h1>)
        }
      </MainWrapper>
    )
  }
}

export default Main