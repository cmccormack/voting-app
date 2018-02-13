import React, { Component } from 'react'
import { Route, Redirect, Switch} from 'react-router-dom'

import { PrivateRoute } from './views/utils'
import {
  RegisterPage,
  LoginPage,
  LogoutPage,
  UserAccountPage,
  NewPollPage,
  ViewPollPage,
} from './views/containers'
import Main from './views/Main'

const Routes = ({
  loggedIn,
  allowRedirects,
  user,
  ...props
}) => (
    <Switch>

      // Login Route
      <Route
        exact path="/login"
        render={() => (
          loggedIn
            ? (<Redirect to='/main' />)
            : (<LoginPage updateAuthStatus={ props.updateAuthStatus } />)
        )}
      />


      // Registration Route
      <Route
        exact path="/register"
        render={() => (
          loggedIn
            ? (<Redirect to='/main' />)
            : (<RegisterPage updateAuthStatus={ props.updateAuthStatus } />)
        )}
      />


      // Logout Route
      <Route
        exact path="/logout"
        render={() => (
          <LogoutPage
            loggedIn={ loggedIn }
            handleLogout={ props.handleLogout }
          />
        )}
      />


      // Access user page only if logged in, else redirect to login
      <PrivateRoute
        allowRedirects={allowRedirects}
        component={UserAccountPage}
        exact path="/user/:user"
        loggedIn={ loggedIn }
        updateAuthStatus={ props.updateAuthStatus }
        user={ user }
      />


      // Create New Poll Route
      <PrivateRoute
        allowRedirects={ allowRedirects }
        exact path="/user/:user/new"
        component={ NewPollPage }
        loggedIn={ loggedIn }
        updateAuthStatus={ props.updateAuthStatus }
      />

      <Route
        exact path="/user/:user/polls/:poll"
        component={ ViewPollPage }
        user={ user }
      />


      // Main page route 
      <Route exact path="/main" render={() => (
        <Main loggedIn={ loggedIn } />
      )} />


      // Redirect to Main page for now
      <Route exact path="/" render={() => (
        <Redirect to='/main' />
      )} />


      // 404 Page not found Route
      <Route render={() => (
        <div className="center teal-text darken-3">
          <h1>404 Page not found</h1>
        </div>
      )} />
    </Switch> 
  )

export default Routes