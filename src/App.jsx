import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { 
  BrowserRouter,
  Redirect,
  Link,
  Route,
  Switch
} from 'react-router-dom'

import './images/favicon.ico'
import Main from './views/Main'
import { RegisterPage, LoginPage } from './views/containers'
import { Header } from './views/layout'

import './styles/body.scss'

const entry_point = document.getElementById('root')

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    }
    this.updateLoggedIn = this.updateLoggedIn.bind(this)
    this.validateAuth = this.validateAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    fetch('/logout', {
      method: 'GET',
      credentials: 'same-origin'
    }).then(()=>{
      this.setState({
        loggedIn: false
      })
    })
  }

  updateLoggedIn(loggedIn) {
    this.setState({ loggedIn })
  }

  validateAuth() {
    fetch('/isauthenticated', {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(res => res.json())
    .then((data) => {
      if (data.isAuthenticated !== this.state.loggedIn) {
        this.setState({loggedIn: data.isAuthenticated})
      }
      console.log(JSON.stringify(data))
    })
  }

  componentWillMount() {
    this.setState({recentlyLoggedOut: false})
  }

  render() {

    this.validateAuth()

    return (
      <div>
        <Route render={props => (
          <Header
            handleLogout={this.handleLogout}
            loggedIn={this.state.loggedIn}
            {...props}
          /> 
        )} />
        <div>
          <Switch>
            <Route exact path="/login" component={LoginPage} />

            <Route exact path="/logout" render={() => (
              this.state.loggedIn
              ? ( <Logout loggedIn={this.state.loggedIn} /> )
              : ( <Redirect to="/main" /> )
            )} />

            <Route exact path="/register" render={() => (
              this.state.loggedIn
              ? ( <Redirect to='/main' /> )
              : ( <RegisterPage updateLoggedIn={this.updateLoggedIn} />)
            )}/>

            <Route exact path="/main" render={() => (
              <Main loggedIn={this.state.loggedIn} />
            )} />

            <Route exact path="/" render={() => (
              <Redirect to='/main' />
            )} />

            <Route render={(props) => (
              <h1>404 Page not found</h1>
            )} />
          </Switch>
        </div>
      </div>
    )
  }
}

ReactDOM.render((
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  ),
  entry_point
)