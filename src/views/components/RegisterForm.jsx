import React, { Component } from 'react'
import styled from 'styled-components'


const CardTitle = styled.div.attrs({
  className: "teal-text text-darken-1 center"
})`
  font-size: 2.4rem !important;
  font-weight: 300;
  line-height: 32px;
  margin-bottom: 8px;
`


class Register extends Component {

  render() {

    return (
      <div className="card z-depth-4">
        <div className="card-content">
          <CardTitle>
            {"Register an account with Votery!"}
          </CardTitle>
          <form id="login_form" onSubmit={this.props.handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="username">Username</label>
                <input
                  className="validate"
                  id="input_username"
                  name="username"
                  onChange={this.props.handleInputChange}
                  required
                  type="text"
                  value={this.props.username}
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="password">Password</label>
                <input
                  className="validate"
                  id="input_password"
                  name="password"
                  onChange={this.props.handleInputChange}
                  required
                  type="password"
                  value={this.props.password}
                />
                <br />
              </div>
            </div>

            <button type="submit">Submit</button>

          </form>
        </div>
      </div>
    )
  }
}


export default Register