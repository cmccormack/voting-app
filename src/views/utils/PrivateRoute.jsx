import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = (props) => {
  
  const { component: Component, allowRedirects, loggedIn, ...rest } = props

  return (
  <Route
      {...rest}
      render={routeProps => {
        return (
          !loggedIn && allowRedirects
            ? <Redirect to={{
                pathname: '/login',
                state: { referrer: props.location }
              }} />
            : <Component {...props} {...routeProps} />
        )
      }}
    />
  )
}

export default PrivateRoute