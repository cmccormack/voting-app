import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { 
  BrowserRouter,
  Redirect,
  Link,
  Route,
  Switch
} from 'react-router-dom'

import './images/favicon.ico'
// import './styles/styles.scss'
import Routes from './Routes'
import { Header, Footer } from './views/layout'


const globalOptions = {
  poll: {
    inputLengths: {
      title: { min: 4, max: 64 },
      shortName: { min: 0, max: 16 },
      choices: { min: 2, max: undefined },
      choice: { min: 1, max: 32 }
    }
  }
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
      loggedIn: false,
      user: '',
      allowRedirects: false,
      loading: true
    }
    this.getAuthStatus = this.getAuthStatus.bind(this)
    this.updateAuthStatus = this.updateAuthStatus.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    fetch('/logout', {
      method: 'POST',
      credentials: 'same-origin'
    }).then(()=>{
      this.setState({
        loggedIn: false
      })
    })
  }

  getAuthStatus(callback) {
    const cb = callback || function() {}

    return fetch('/isauthenticated', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json()).then((data) => {
      // console.log(`App.getAuthStatus: ${JSON.stringify(data)}`)
      cb(data)
      return data
    })
  }

  updateAuthStatus(callback) {
    
    const cb = callback || function() {}

    this.getAuthStatus(data => {
      const { user, isAuthenticated: loggedIn } = data
      this.setState({
        loggedIn,
        user,
        allowRedirects: true
      })
      cb(data)
    })
  }


  componentDidMount() {
    const intervalId = setTimeout(
      () => this.setState({ loading: false }),
      2000
    )
    this.updateAuthStatus(
      () => {
        clearInterval(intervalId)
        this.setState({ loading: false })
      }
    )
  }


  render() {

    return (
      <Wrapper>
        <Route render={routeProps => (
          <HeaderStyled
            handleLogout={this.handleLogout}
            updateAuth={this.updateAuthStatus}
            {...this.state}
            {...routeProps}
          /> 
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
        <Footer />
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