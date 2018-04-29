import React, { Component, } from 'react'
import styled from 'styled-components'
import { Link, } from 'react-router-dom'
import Scroll from 'react-scroll'
import PropTypes from 'prop-types'

import {
  Chart,
  Col,
  Container,
  GraphCard,
  PageNum,
  Pagination,
  Row,
} from './layout'
import { getColorsIncrementHue, } from '../utils/colors'

const MainWrapper = styled(Container) `
  border-radius: 5px;
  margin: 50px auto 80px;
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
  className: ({ color, }) => color,
}) `
  margin: ${({ margin, }) => margin || '0'};
  padding: ${({ padding, }) => padding || '0'};
  font-size: ${({ fontSize, }) => fontSize};
`

Header.propTypes = {
  color: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  fontSize: PropTypes.string,
}

const CardActionLink = styled(Link)`
  color: #039be5 !important;
  text-transform: none !important;
`

const PaginationStyled = styled(Pagination)`
  width: 100%;
  margin: auto;

  @media only screen and (max-width: 768px){
    li {
      margin: 4px auto;
      display: block;
    }
  }
`


const textContent = {
  header: 'Welcome to Votery!', 
  subheaders: [
    'Check out some of the great user-submitted polls below, or create your own.',
    'See if the thing you like is better than the thing that other person likes!',
  ],
}


class Main extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activePage: 0,
      limit: 6,
      loaded: false,
      pagesCount: 0,
      polls: [],
      pollsCount: 0,
    }

    this.chartColorOptions = {
      saturation: 40,
      lightness: 60,
      increment: 20,
    }

    this.mainOffset = 0
    this._isMounted = false
  }

  componentDidMount() {

    this._isMounted = true
    if (this.state.loaded) return

    const bodyRectTop = document.body
      .getBoundingClientRect().top
    const mainRectTop = document.getElementById('mainBody')
      .getBoundingClientRect().top
    this.mainOffset = mainRectTop - bodyRectTop - 80

    this.fetchPolls()
 
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getPage(page) {
    const { pagesCount: pages, activePage, } = this.state
    if (page > pages -1 || page < 0 || page === activePage) return

    console.log(this.mainOffset)
    Scroll.animateScroll.scrollTo(
      this.mainOffset,
      { duration: 500, smooth: 'easeOutQuad',}
    )

    this.fetchPolls(page)
  }


  fetchPolls(skip=0) {

    const { limit, } = this.state
    const params = { skip: skip*limit, limit, }

    const query = Object.keys(params).map(k => (`${k}=${params[k]}`)).join('&')

    fetch(`/polls?${query}`, { method: 'GET', credentials: 'include', })
    .then(res => res.json()).then(({polls, count,}) => {

      // Return early if component unmounted
      if (!this._isMounted) return


      // console.log(mainRect - bodyRect)
      // window.scrollTo(0, 2000)
      const { lightness, saturation, increment, } = this.chartColorOptions
      this.setState({
        polls: polls.map(poll => {
          poll.choiceColors = getColorsIncrementHue(
            poll.seedColor, {
              length: poll.choices.length,
              increment,
              lightness,
              saturation,
            }
          )
          return poll
        }),
        loaded: true,
        pagesCount: Math.ceil(count/limit),
        pollsCount: count,
        activePage: skip,
      })
    })
  }


  render() {

    document.title = "Votery | Main"
    const { user, loggedIn, } = this.props
    const { header, subheaders, } = textContent
    const {
      activePage,
      loaded,
      pagesCount,
      polls,
    } = this.state

    const title = (
      <Row>
        <Col size="s12">
          <Header
            className="teal-text text-darken-3"
            fontSize="4rem"
            padding="3rem 0"
          >
            {header}
          </Header>
        </Col>

        <Col size="s12">
          {
            subheaders.map((h,i) => (
              <Header
                className="teal-text text-darken-1"
                fontSize="1.2rem"
                padding=".2rem 0"
                key={i}
              >
                {h}
              </Header>
            ))
          }
        </Col>
      </Row>
    )

    const loadingDisplay = (
      <h1 className="teal-text text-darken-3">Loading...</h1>
    )

    const body = (
      <Row>
        {polls.map(
          ({ title, shortName, createdBy, ...poll }) => {
            const { username, } = createdBy

            return (
              <Col size="s12 xl6" key={`${username}-${shortName}`}>
                <GraphCard
                  title={
                    <Link to={`user/${username}/polls/${shortName}`}>
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
                      <CardActionLink to={`user/${username}/polls`}>
                        {username}
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
              to={loggedIn ? `/user/${user}/new` : 'register'}
            >
              {'Be the first to create one!'}
            </Link>
          </Header>
        </Col>
      </Row>
    )

    const pagination = (
      <PaginationStyled>
        <PageNum
          active={activePage === 0}
          activeClass="text-lighten-4"
          className="btn-flat"
          effectClass="waves-effect waves-teal"
          fontColorClass="teal-text"
          onClick={this.getPage.bind(this, activePage - 1)}
        >
          {'Previous'}
        </PageNum>
        {
          Array(pagesCount)
            .fill().map((_, i) => (
              <PageNum
                active={activePage === i}
                activeClass="text-lighten-3"
                className="btn-flat"
                effectClass="waves-effect waves-teal"
                fontColorClass="teal-text"
                key={String(i)}
                onClick={this.getPage.bind(this, i)}
              >
                { i+1 }
              </PageNum>
            ))
        }
        <PageNum
          active={activePage === pagesCount - 1}
          activeClass="text-lighten-4"
          className="btn-flat"
          effectClass="waves-effect waves-teal"
          fontColorClass="teal-text"
          onClick={this.getPage.bind(this, activePage + 1)}
        >
          {'Next'}
        </PageNum>
      </PaginationStyled>
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
          id="mainBody"
        >
          {
            !loaded
              ? loadingDisplay
              : polls.length > 0
                ? body
                : pollsEmpty
          }
          { loaded && pagination }
        </BodyWrapper>
      </MainWrapper>
    )
  }
}

Main.propTypes = {
  user: PropTypes.string,
  loggedIn: PropTypes.bool,
}

export default Main