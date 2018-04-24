import React from 'react'
import { Redirect, } from 'react-router-dom'
import { IndeterminateProgressBar, } from '../utils'
import PropTypes from 'prop-types'


const LogoutPage = ({ handleLogout, loggedIn, }) => {
  document.title = "Votery | Logging Out..."
  
  setTimeout( handleLogout, 700 )
  
  return (
    !loggedIn
    ? <Redirect to="/login" />
    : (
      <div className="container center">
        <div className="row">
          <div className="col s12">
            <h2 className="teal-text text-lighten-1">Thanks for visiting!</h2>
            <h3 className="teal-text text-lighten-2">Logging Out...</h3>
          </div>
        </div>
        <div className="row">
          <div className="col s8 offset-s2">
            <IndeterminateProgressBar />
          </div>
        </div>
      </div>
    )
  )
}

LogoutPage.propTypes = {
  handleLogout: PropTypes.func,
  loggedIn: PropTypes.bool,
}

export default LogoutPage