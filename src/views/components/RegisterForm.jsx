import React, { Component } from 'react'
import styled from 'styled-components'

import {
  Alert,
  FormCard,
  FormSubmitButton,
  FormInput,
  FormRow
} from '../layout'

class RegisterForm extends Component {

  render() {

    const { title, footer, error } = this.props

    const alert = (
      <FormRow>
        <Alert
          className="col s8 offset-s2"
          show={error ? true : false}
          type={error ? 'warning' : 'success'}
        >
          {error}
        </Alert>
      </FormRow>
    )

    return (
      <FormCard 
        alert={ alert }
        error={ error }
        footer={ footer }
        title={ title }
      >
        <form id="register_form" onSubmit={this.props.handleSubmit}>

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

export default RegisterForm