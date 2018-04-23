import React, { Component } from 'react'
import styled from 'styled-components'
import { VictoryPie, VictoryTheme } from 'victory'
import { Link } from 'react-router-dom'
import Scroll from 'react-scroll'

import { Chart, Col, GraphCard, Row } from './layout'
import { getRandomHue, getColorsIncrementHue } from '../utils/colors'

const Container = ({ className = "", children }) => (
  <div className={`container ${className}`}>
    {children}
  </div>
)

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

const PaginationStyled = styled.div`
  width: 100%;

  @media only screen and (max-width: 768px){
    li {
      margin: 4px auto;
      display: block;
    }
  }
`
const Pagination = ({children, ...props}) => (
  <PaginationStyled { ...props }>
    { children }
  </PaginationStyled>
)


const PageNum = ({
  active=false,
  activeClass='',
  className='',
  effectClass='',
  fontColorClass='',
  ...props
}) => {

  return (
    <li
      className={[
        className,
        fontColorClass,
        active ? '' : effectClass,
        !active ? '' : activeClass,
        active ? 'active' : '',
      ].join(' ')}
      { ...props }
    >
      { props.children }
    </li>
  )
}

const textContent = {
  header: 'Welcome to Votery!', 
  subheaders: [
    'Check out some of the great user-submitted polls below, or create your own.',
    'See if the thing you like is better than the thing that other person likes!'
  ]
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

    this._isMounted = false
  }

  componentDidMount() {

    this._isMounted = true
    if (this.state.loaded) return
    
    this.fetchPolls()
 
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getPage(page) {
    const { pagesCount: pages, activePage } = this.state
    if (page > pages -1 || page < 0 || page === activePage) return

    window.scrollTo(0,50)

    this.fetchPolls(page)
  }


  fetchPolls(skip=0) {

    const { limit } = this.state
    const params = { skip: skip*limit, limit }

    const query = Object.keys(params).map(k => (`${k}=${params[k]}`)).join('&')

    fetch(`/polls?${query}`, { method: 'GET', credentials: 'include' })
    .then(res => res.json()).then(({polls, count}) => {

      // Return early if component unmounted
      if (!this._isMounted) return

      window.scrollTo(0, 50)
      const { lightness, saturation, increment } = this.chartColorOptions
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

    const { user, loggedIn } = this.props
    const { header, subheaders } = textContent
    const {
      activePage,
      limit,
      loaded,
      pagesCount,
      polls,
      pollsCount
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
            const { username } = createdBy

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
              to={loggedIn ? `user/${user}/new` : 'register'}
            >
              {'Be the first to create one!'}
            </Link>
          </Header>
        </Col>
      </Row>
    )

    const pagination = (
      <Pagination
        className="center"
        activePage={activePage}
        itemsCountPerPage={10}
        totalItemsCount={450}
        pageRangeDisplayed={5}
        onChange={this.getPage}
      >
        <ul>
          <PageNum
            active={activePage === 0}
            activeClass="text-lighten-4"
            fontColorClass="teal-text"
            effectClass="waves-effect waves-teal"
            className="btn-flat"
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
                  {i + 1}
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
        </ul>
      </Pagination>
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
          { pagination }
          {
            !loaded
              ? loadingDisplay
              : polls.length > 0
                ? body
                : pollsEmpty
          }
          { pagination }
        </BodyWrapper>
      </MainWrapper>
    )
  }
}

export default Main