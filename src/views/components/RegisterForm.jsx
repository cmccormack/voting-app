import React, { Component } from 'react'
import styled from 'styled-components'


const Card = styled.div.attrs({
  className: "card z-depth-4"
})`
  margin-top: 100px;
`

const CardTitle = styled.div.attrs({
  className: "teal-text text-darken-1 center"
})`
  font-size: 2.4rem !important;
  font-weight: 300;
  line-height: 32px;
  margin: 20px 0 50px;
`

const ErrorMessge = styled.div.attrs({
  className: "center amber lighten-2 col s8 offset-s2"
})`
  display: visible;
  border-radius: 5px;
`

const CardFooter = styled.div.attrs({
  className: "row center"
})`
  margin-top: 100px;
`


class RegisterForm extends Component {

  render() {

    return (
      <Card>
        <div className="card-content">
          <CardTitle>
            {"Register an account with Votery!"}
          </CardTitle>
          <form id="register_form" onSubmit={this.props.handleSubmit}>

            <div className="row">
              <ErrorMessge>
                {'Placeholder error message'}
              </ErrorMessge>
            </div>

            <div className="row">
              <div className="input-field col s6 offset-s3">
                <i className="material-icons prefix">account_circle</i>
                <input
                  className="validate"
                  id="input_username"
                  name="username"
                  onChange={this.props.handleInputChange}
                  required
                  type="text"
                  value={this.props.username}
                />
                <label htmlFor="username">Username</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6 offset-s3">
                <i className="material-icons prefix">lock</i>
                <input
                  className="validate"
                  id="input_password"
                  name="password"
                  onChange={this.props.handleInputChange}
                  required
                  type="password"
                  value={this.props.password}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>

            <div className="row">
              <div className="col s6 offset-s3">
                <a
                  className="waves-effect waves-light btn right"
                  onClick={this.props.handleSubmit}
                >
                  <i className="material-icons right">send</i>
                  {'Submit'}
                </a>
              </div>
            </div>



          </form>

          <CardFooter>
            {'Already have an account? '}
            <a href="/login">Login!</a>
          </CardFooter>
        </div>
      </Card>
    )
  }
}

export default RegisterForm