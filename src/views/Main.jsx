import React, { Component } from 'react'
import styled from 'styled-components'
import { VictoryPie, VictoryTheme } from 'victory'
import { Link } from 'react-router-dom'
import { GraphCard } from './layout'
import '../images/graph-placeholder.png'


const Container = ({ className="", children }) => (
  <div className={`container ${className}`}>
    {children}
  </div>
)

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

const MainWrapper = styled(Container)`
  border-radius: 5px;
  margin-top: 80px;
  padding: 20px;
`

const SectionWrapper = styled.div`
  box-shadow: inset 1px 1px 3px #6aa;
  border-radius: 5px;
  padding: 20px;
`

const TitleWrapper = SectionWrapper.extend`

`

const BodyWrapper = SectionWrapper.extend`
  padding-top: 40px;
  margin-top: 20px;
`

const Header = styled.p.attrs({
  className: ({color}) => color,
})`
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
  font-size: ${({ fontSize }) => fontSize};
`


class Main extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      polls: []
    }

    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
    console.log(`Main loaded? ${this.state.loaded}`)
    if (this.state.loaded) return
    fetch('/polls', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json()).then((polls) => {
        if (!this._isMounted) return
        this.setState({ polls, loaded: true })
      })
  }

  componentWillUnmount() {
    this._isMounted = true
  }


  render() {

    const title = (
      <Row>
        <Col size="s12">
          <Header
            className="teal-text text-darken-3"
            fontSize="4rem"
            padding="3rem 0"
          >
            {'Welcome to Votery!'}
          </Header>
        </Col>

        <Col size="s12">
          <Header
            className="teal-text text-darken-1"
            fontSize="1.2rem"
            padding=".2rem 0"
          >
            {'Check out some of the great user-submitted ' +
            'polls below, or create your own.'}
          </Header>
          <Header
            className="teal-text text-darken-1"
            fontSize="1.2rem"
            padding=".2rem 0"
          >
            {'See if the thing you like is better then ' +
            'the thing that other person likes!'}
          </Header>
        </Col>
      </Row>
    )

    const loadingDisplay = (
        <h1 className="teal-text text-darken-3">Loading...</h1>
    )

    const body = (
      <Row>
        { this.state.polls.map(
          ({title, shortName, createdBy: user, ...poll}) => {
            const seed = Math.floor(Math.random() * 360)
            return (
              <Col size="s12 m6" key={`${user}-${shortName}`}>
                <GraphCard
                  title={title}
                  content={
                    <VictoryPie
                      data={
                        poll.choices && poll.choices.map(
                          ({ choice, votes }) => {
                          return {
                            x: choice,
                            y: votes + 1,
                            label: choice
                          }
                        })}
                      endAngle={seed + 360}
                      height={250}
                      innerRadius={40}
                      padAngle={3}
                      startAngle={seed}
                      style={{
                        data: {
                          fill: (props) => {
                            props.color = Math.floor(Math.random() * 360)
                            return `hsl(${props.color}, 60%, 60%)`
                          }
                        }
                      }}
                      theme={VictoryTheme.material}
                    />
                  }
                  actions={`Created by ${user}`}
                />
              </Col>
            )
        })}
      </Row>
    )

    const pollsEmpty = (
      <Row>
        <Col size="s12">
          <Header
            className="teal-text text-darken-2"
            fontSize="24px"
          >
            {'No polls found.  '}
            <Link
              className="teal-text text-accent-4"
              to="/new"
            >
              {'Be the first to create one!'}
            </Link>
          </Header>
        </Col>
      </Row>
    )

    return (
      <MainWrapper
        className="center teal lighten-4 z-depth-2"
      >
        <TitleWrapper
          className="teal lighten-5"
        >
          { title }
        </TitleWrapper>
        <BodyWrapper
          className="teal lighten-5"
        >
        {
          !this.state.loaded 
            ? loadingDisplay 
            : this.state.polls.length > 0
              ? body
              : pollsEmpty
        }
        </BodyWrapper>
      </MainWrapper>
    )
  }
}

export default Main