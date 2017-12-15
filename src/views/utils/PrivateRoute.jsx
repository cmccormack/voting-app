import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = (props) => {
  
  const { component: Component, allowRedirects, loggedIn, ...rest } = props
  console.log(`PrivateRoute: loggedIn: ${loggedIn}`)

  return (
  <Route
      {...rest}
      render={routeProps => {
        console.log(props)
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