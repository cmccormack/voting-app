import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { 
  BrowserRouter,
  Redirect,
  Link,
  Route,
  Switch
} from 'react-router-dom'

import Main from './views/Main.jsx'
import Login from './views/Login.jsx'
import Register from './views/Register.jsx'

import './styles/body.scss'

const entry_point = document.getElementById('root')

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    }
    this.updateLoggedIn = this.updateLoggedIn.bind(this)
  }

  updateLoggedIn(loggedIn){
    this.setState({ loggedIn })
  }

  render() {
    return (
      <div>
        <nav style={{ backgroundColor: 'lightseagreen'}}>
          <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/main">Main</Link></li>
          </ul>
        </nav>
        <div>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" render={() => (
              this.state.loggedIn
              ? ( <Redirect to='/main' /> )
              : ( <Register loggedIn={this.updateLoggedIn} />)
            )}/>
            <Route exact path="/main" component={Main} />
            <Route exact path="/" component={Main} />
            <Route render={(props) => (
              <h1>404 Page not found</h1>
            )}/>
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