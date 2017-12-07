import React, { Component } from 'react'
import styled from 'styled-components'

import {
  FormCard,
  FormSubmitButton,
  FormInput
} from '../layout'

class RegisterForm extends Component {

  render() {

    const props = {
      title: "register an account with votery!",
      error: "Placeholder error message",
      footer: (
        <div>
          {'Already have an account? '}
          <a href="/login">Login!</a>
        </div>
      )
    }

    return (
        <FormCard {...props}>
          <form id="register_form" onSubmit={this.props.handleSubmit}>

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

export default RegisterForm