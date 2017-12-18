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
import Routes from './Routes'
import Main from './views/Main'
import { Header } from './views/layout'

import './styles/body.scss'

const entry_point = document.getElementById('root')

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      user: '',
      allowRedirects: false
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
      console.log(`App.getAuthStatus: ${JSON.stringify(data)}`)
      cb(data)
      return data
    })
  }

  updateAuthStatus(callback) {
    const cb = callback || function() {}

    this.getAuthStatus(data => {
      this.setState({
        loggedIn: data.isAuthenticated,
        user: data.user,
        allowRedirects: true
      })
      cb(data)
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
        <Routes
          {...this.state}
          handleLogout={this.handleLogout}
          updateAuthStatus={this.updateAuthStatus}
        />
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