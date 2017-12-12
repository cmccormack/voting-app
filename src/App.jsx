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
      loggedIn: false,
      user: ''
    }
    this.getAuthStatus = this.getAuthStatus.bind(this)
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

  getAuthStatus(callback) {
    fetch('/isauthenticated', {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(res => res.json()).then((data) => {
      this.setState({
        loggedIn: data.isAuthenticated,
        user: data.user
      })
      console.log(JSON.stringify(data))
      callback(data)
    })
  }

  componentWillMount() {
    this.setState({recentlyLoggedOut: false})
  }

  render() {

    return (
      <div>
        <Route render={routeProps => (
          <Header
            handleLogout={this.handleLogout}
            {...this.state}
            {...routeProps}
          /> 
        )} />
        <div>
          <Switch>

            // Login Route
            <Route exact path="/login" component={LoginPage} />

            // Logout Route
            <Route exact path="/logout" render={() => (
              this.state.loggedIn
              ? ( <Logout loggedIn={this.state.loggedIn} /> )
              : ( <Redirect to="/main" /> )
            )} />

            // Registration Route
            <Route exact path="/register" render={() => (
              this.state.loggedIn
              ? ( <Redirect to='/main' /> )
              : (<RegisterPage getAuthStatus={this.getAuthStatus} />)
            )}/>

            // Main page route 
            <Route exact path="/main" render={() => (
              <Main loggedIn={this.state.loggedIn} />
            )} />

            // Redirect to Main page for now
            <Route exact path="/" render={() => (
              <Redirect to='/main' />
            )} />

            // 404 Page not found Route
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