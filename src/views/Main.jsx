import React, { Component } from 'react'
import styled from 'styled-components'
import { VictoryPie, VictoryTheme } from 'victory'
import { Link } from 'react-router-dom'

import { Chart, Col, GraphCard, Row } from './layout'
import { getRandomHue, getColorsIncrementHue } from '../utils/colors'

const Container = ({ className = "", children }) => (
  <div className={`container ${className}`}>
    {children}
  </div>
)

const MainWrapper = styled(Container) `
  border-radius: 5px;
  margin: 80px auto 80px;
  padding: 20px;
  min-width: 420px;
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
  className: ({ color }) => color,
}) `
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
  font-size: ${({ fontSize }) => fontSize};
`

const CardActionLink = styled(Link)`
  color: #039be5 !important;
  text-transform: none !important;
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
    if (this.state.loaded) return

    fetch('/polls', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json()).then((polls) => {
        if (!this._isMounted) return
        this.setState({
          polls: polls.map(poll => {
            poll.choiceColors = getColorsIncrementHue(
              getRandomHue(),
              {
                length: poll.choices.length,
                increment: 20,
                saturation: 60,
              }
            )
            return poll
          }),
          loaded: true
        })
      })
  }

  componentWillUnmount() {
    this._isMounted = true
  }


  render() {

    const { user, loggedIn } = this.props

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
        {this.state.polls.map(
          ({ title, shortName, createdBy: user, ...poll }) => {
            return (
              <Col size="s12 xl6" key={`${user}-${shortName}`}>
                <GraphCard
                  title={
                    <Link to={`user/${user}/polls/${shortName}`}>
                      {title}
                    </Link>
                  }
                  content={
                    <Chart
                      choices={poll.choices}
                      colors={poll.choiceColors}
                    />
                  }
                  actions={
                    <span className={'card-footer-text'}>
                      {'Created by '}
                      <CardActionLink to={`user/${user}/polls`}>{user}
                      </CardActionLink>
                    </span>
                  }
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
              to={loggedIn ? `user/${user}/new` : 'register'}
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
          {title}
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