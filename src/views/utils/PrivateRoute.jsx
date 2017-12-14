import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
  console.log(`PrivateRoute: loggedIn: ${loggedIn}`)
  return (
    <Route
      {...rest}
      render={props => {
        console.log(props)
        return (
          loggedIn
            ? <Component {...props} />
            : <Redirect to={{
              pathname: '/login',
              state: { referrer: props.location }
            }} />
        )
      }}
    />
  )
}

export default PrivateRoute