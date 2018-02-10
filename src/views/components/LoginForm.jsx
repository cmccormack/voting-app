import React, { Component } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import {
  FormCard,
  FormSubmitButton,
  FormInput,
  FormRow
} from '../layout'

class LoginForm extends Component {

  render() {
    
    const { title, footer, error } = this.props

    return (
      <FormCard
        title={title}
        footer={footer}
        error={error}
      >
        <form id="login_form" onSubmit={this.props.handleSubmit}>

          <FormRow>
            <FormInput
              icon="account_circle"
              label="Username"
              name="username"
              onChange={this.props.handleInputChange}
              required
              size="s12 l8 offset-l2"
              value={this.props.username}
            >
            </FormInput>
          </FormRow>

          <FormRow>
            <FormInput
              icon="lock"
              label="Password"
              name="password"
              onChange={this.props.handleInputChange}
              required
              size="s12 l8 offset-l2"
              type="password"
              value={this.props.password}
            >
            </FormInput>
          </FormRow>

          <FormRow>
            <FormSubmitButton
              onClick={this.props.handleSubmit}
              position="right"
              size="s12 l8 offset-l2"
            />
          </FormRow>

        </form>

      </FormCard>
    )
  }
}

export default LoginForm