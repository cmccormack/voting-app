import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

import Main from './views/Main.jsx'
import Login from './views/Login.jsx'

import './styles/body.scss'

const entry_point = document.getElementById('root')

const App = () => (
  <div>
    <nav>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/main">Main</Link></li>
      </ul>
    </nav>
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/main" component={Main} />
        <Route exact path="/" component={Main} />
        <Route render={(props) => (
          <h1>404 Page not found</h1>
        )}/>
      </Switch>
    </div>
  </div>
)

ReactDOM.render((
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  ),
  entry_point
)