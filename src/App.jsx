import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { 
  BrowserRouter,
  HashRouter,
  Redirect,
  Link,
  Route,
  Switch
} from 'react-router-dom'

import './images/favicon.ico'
import Main from './views/Main'
import { RegisterPage, LoginPage, LogoutPage, UserPage } from './views/containers'
import { Header } from './views/layout'

import './styles/body.scss'

const entry_point = document.getElementById('root')

const PrivateRoute = ({component: Component, loggedIn, ...rest}) => (
  <Route 
    {...rest}
    render={ props => (
      loggedIn
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { referrer: props.location }
      }} />
    )}
  />
)

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
      method: 'POST',
      credentials: 'same-origin'
    }).then(()=>{
      this.setState({
        loggedIn: false
      })
    })
  }

  componentDidUpdate(){
    // this.getAuthStatus(console.log)
  }

  getAuthStatus(callback) {
    fetch('/isauthenticated', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json()).then((data) => {
      console.log(`App: User is authenticated, setting state...`)
      this.setState({
        loggedIn: data.isAuthenticated,
        user: data.user
      })
      console.log(JSON.stringify(data))
      callback(data)
    })
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
              this.state.loggedIn
              ? ( <Redirect to='/main' /> )
              : (<RegisterPage getAuthStatus={this.getAuthStatus} />)
            )}/>

            // Main page route 
            <Route exact path="/main" render={() => (
              <Main loggedIn={this.state.loggedIn} />
            )} />

            <PrivateRoute
              exact path="/user"
              component={UserPage}
              loggedIn={this.state.loggedIn}
            />

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
    <HashRouter>
      <App/>
    </HashRouter>
  ),
  entry_point
)