import React from 'react'
import { Route, Redirect, Switch,} from 'react-router-dom'
import PropTypes from 'prop-types'

import { PrivateRoute, } from './views/utils'
import {
  LoginPage,
  LogoutPage,
  NewPollPage,
  RegisterPage,
  UserAccountPage,
  UserPollsPage,
  ViewPollPage,
} from './views/containers'
import Main from './views/Main'

const Routes = ({
  allowRedirects,
  handleLogout,
  inputLengths,
  loggedIn,
  updateAuthStatus,
  user,
}) => (
  <Switch>


    {/* Login Route */}
    <Route
      exact path="/login"
      render={() => (
        loggedIn
          ? (<Redirect to='/main' />)
          : (<LoginPage updateAuthStatus={ updateAuthStatus } />)
      )}
    />


    {/* Registration Route */}
    <Route
      exact path="/register"
      render={() => (
        loggedIn
          ? (<Redirect to='/main' />)
          : (<RegisterPage updateAuthStatus={ updateAuthStatus } />)
      )}
    />


    {/* Logout Route */}
    <Route
      exact path="/logout"
      render={() => (
        <LogoutPage
          loggedIn={ loggedIn }
          handleLogout={ handleLogout }
        />
      )}
    />


    {/* Access user page only if logged in, else redirect to login */}
    <PrivateRoute
      allowRedirects={allowRedirects}
      component={UserAccountPage}
      exact path="/user/:user"
      loggedIn={ loggedIn }
      updateAuthStatus={ updateAuthStatus }
      user={ user }
    />


    {/* Create New Poll Route */}
    <PrivateRoute
      allowRedirects={ allowRedirects }
      exact path="/user/:user/new"
      component={ NewPollPage }
      inputLengths={ inputLengths }
      loggedIn={ loggedIn }
      updateAuthStatus={ updateAuthStatus }
      user={ user }
    />


    {/* View User's Polls Route */}
    <Route
      exact path="/user/:user/polls"
      render={ ({match,}) => (
        <UserPollsPage
          title={`Polls created by ${match.params.user}`}
          user={match.params.user}
        />
      )}
    />


    {/* View a Poll Route */}
    <Route
      exact path="/user/:user/polls/:poll"
      render={ ({ match, }) => 
        <ViewPollPage
          inputLengths={ inputLengths }
          loggedIn={ loggedIn }
          match={ match }
          user={ user }
        /> 
      }
    />


    {/* Main Page Route  */}
    <Route
      exact path="/main"
      render={() => (
        <Main 
          loggedIn={ loggedIn }
          user={user}
        />
      )}
    />


    {/* Redirect to Main Page Route */}
    <Route
      exact path="/"
      render={ () => (
        <Redirect
          to='/main'
        />
      )} 
    />


    {/* 404 Page not found Route */}
    <Route render={() => (
      <div className="center teal-text darken-3">
        <h1>404 Page not found</h1>
      </div>
    )} />
  </Switch> 
)

Routes.propTypes = {
  loggedIn: PropTypes.bool,
  allowRedirects: PropTypes.bool,
  handleLogout: PropTypes.func,
  inputLengths: PropTypes.object,
  updateAuthStatus: PropTypes.func,
  user: PropTypes.string,
}

export default Routes