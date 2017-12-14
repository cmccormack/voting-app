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
import { RegisterPage, LoginPage, LogoutPage, UserPage } from './views/containers'
import { Header } from './views/layout'
import { PrivateRoute } from './views/utils'

import './styles/body.scss'

const entry_point = document.getElementById('root')

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: true,
      user: ''
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
    fetch('/isauthenticated', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json()).then((data) => {
      console.log(`App.getAuthStatus: ${JSON.stringify(data)}`)
      callback(data)
    })
  }

  updateAuthStatus(callback) {
    this.getAuthStatus(data => {
      this.setState({
        loggedIn: data.isAuthenticated,
        user: data.user
      })
      callback(data)
    })
  }

  componentDidMount() {
    this.updateAuthStatus(console.log)
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
            <Route
              exact path="/login"
              render={(routeProps) => (
                <LoginPage loggedIn={this.state.loggedIn} {...routeProps} />
              )}
            />


            // Logout Route
            <Route
              exact path="/logout"
              render={() => (
                <LogoutPage
                  loggedIn={this.state.loggedIn}
                  handleLogout={this.handleLogout}
                /> 
              )}
            />


            // Registration Route
            <Route exact path="/register" render={() => (
              this.state.loggedIn && this.state.user
              ? ( <Redirect to='/main' /> )
              : (<RegisterPage updateAuthStatus={this.updateAuthStatus} />)
            )}/>


            // Access user page only if logged in, else redirect to login
            <PrivateRoute
              exact path="/user"
              component={UserPage}
              loggedIn={this.state.loggedIn}
            />


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