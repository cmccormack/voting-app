import React, { Component, } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { BrowserRouter, Link, Route, } from 'react-router-dom'
import classNames from 'classnames'

import './images/favicon.ico'
// import './styles/styles.scss'
import Routes from './Routes'
import { Col, } from './views/layout'
import { Header, NavItems, } from './views/layout/header'
import { Footer, TextLink, SocialLink, } from './views/layout/footer'


const globalOptions = {
  poll: {
    inputLengths: {
      title: { min: 4, max: 64, },
      shortName: { min: 0, max: 16, },
      choices: { min: 2, max: undefined, },
      choice: { min: 1, max: 32, },
    },
  },
  footer: {
    socialIcons: [
      {
        href: "https://www.facebook.com/christopher.j.mccormack",
        icon: "facebook",
      },
      {
        href: "https://twitter.com/chrisjmccormack",
        icon: "twitter",
      },
      {
        href: "https://github.com/cmccormack",
        icon: "github",
      },
      {
        href: "https://www.linkedin.com/in/christopherjmccormack",
        icon: "linkedin",
      },
    ],
  },
}


const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  `

const Main = styled.main`
  flex: 1 0 auto;
  min-width: 420px;
`

const HeaderStyled = styled(Header)`
  min-width: 420px;
`

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      inputLengths: globalOptions.poll.inputLengths,
      loggedIn: false,
      user: '',
      allowRedirects: false,
      loading: true,
    }
    this.getAuthStatus = this.getAuthStatus.bind(this)
    this.updateAuthStatus = this.updateAuthStatus.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    fetch('/logout', {
      method: 'POST',
      credentials: 'same-origin',
    }).then(()=>{
      this.setState({
        loggedIn: false,
      })
    })
  }

  getAuthStatus(callback) {
    const cb = callback || function() {}

    return fetch('/isauthenticated', {
      method: 'GET',
      credentials: 'include',
    })
    .then(res => res.json()).then((data) => {
      cb(data)
      return data
    })
  }

  updateAuthStatus(callback) {

    const cb = callback || function() {}

    this.getAuthStatus(data => {
      const { user, isAuthenticated: loggedIn, } = data
      this.setState({
        loggedIn,
        user,
        allowRedirects: true,
      })
      cb(data)
    })
  }


  componentDidMount() {
    const intervalId = setTimeout(
      () => this.setState({ loading: false, }),
      2000
    )
    this.updateAuthStatus(
      () => {
        clearInterval(intervalId)
        this.setState({ loading: false, })
      }
    )
  }


  render() {

    const { footer: { socialIcons, }, } = globalOptions
    const { loggedIn, user, } = this.state

    const headerLinks = [
      { hidden: !loggedIn, to: `/user/${user}`, content: `Hello, ${user}!`, },
      { hidden: false, to: '/main', content: 'Main', },
      { hidden: !loggedIn, to: `/user/${user}/new`, content: 'New Poll', },
      { hidden: loggedIn, to: '/login', content: 'Login', },
      { hidden: loggedIn, to: '/register', content: 'Register', },
      { hidden: !loggedIn, to: '/logout', content: 'Logout', },
    ]

    return (
      <Wrapper>
        <Route render={ routeProps => (
          <HeaderStyled
            brand="Votery"
            brandTo="/main"
            handleLogout={ this.handleLogout }
            links={ headerLinks }
            tribarClass="right"
            navColorClass="teal lighten-1"
            navItemsAlign="right"
            updateAuth={ this.updateAuthStatus }
            { ...this.state }
            { ...routeProps }
          >
            <NavItems
              className={"right hide-on-med-and-down"}
              id="top-nav"
              updateAuth={this.updateAuthStatus.bind(null,null)}
            >
              { headerLinks }
            </NavItems>
          </HeaderStyled>
        )} />
        <Main>
          { this.state.loading
            ? <div className="center teal-text darken-2"><h1>Loading...</h1></div>
            : <Routes
                {...this.state}
                handleLogout={this.handleLogout}
                updateAuthStatus={this.updateAuthStatus}
              />
            
          }
        </Main>
        <Footer
          align={'center'}
          colorClass="teal lighten-1"
        >
          <Col align="center" size="l6 s12">
            { socialIcons.map((item) => (
              <SocialLink
                color="#DEE"
                href={item.href}
                key={item.icon}
                spacing="12px"
                target="_blank"
              >
                <i className={`fa fa-lg fa-${item.icon}`}></i>
              </SocialLink>
            ))}
          </Col>
          <Col
            className="hide-on-med-and-down"
            size="l6 s12"
          >
            <span className="">
              {"Created by "}
              <TextLink
                color="#DEE"
                href="https://mackville.net"
                target="_blank"
              >
                {"Christopher McCormack"}
              </TextLink>
            </span>
          </Col>
        </Footer>
      </Wrapper>
    )
  }
}

ReactDOM.render((
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  ),
  document.getElementById('root')
)