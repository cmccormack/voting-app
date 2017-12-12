import React, { Component } from 'react'
import styled from 'styled-components'

import {
  FormCard,
  FormSubmitButton,
  FormInput
} from '../layout'

class LoginForm extends Component {

  render() {

    const { error } = this.props

    const props = {
      title: "Log in to Votery!",
      error: error,
      footer: (
        <div>
          {'Don\'t have an account?  '}
          <a href="/register">Register!</a>
        </div>
      )
    }

    return (
      <FormCard {...props}>
        <form id="login_form" onSubmit={this.props.handleSubmit}>

          <FormInput
            icon="account_circle"
            label="Username"
            name="username"
            onChange={this.props.handleInputChange}
            required
            value={this.props.username}
          >
          </FormInput>

          <FormInput
            icon="lock"
            label="Password"
            name="password"
            onChange={this.props.handleInputChange}
            required
            type="password"
            value={this.props.password}
          >
          </FormInput>

          <FormSubmitButton
            onClick={this.props.handleSubmit}
            position="right"
          />

        </form>

      </FormCard>
    )
  }
}

export default LoginForm