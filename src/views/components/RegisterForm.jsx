import React, { Component } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import {
  FormCard,
  FormSubmitButton,
  FormInput
} from '../layout'

class RegisterForm extends Component {

  render() {

    const { error } = this.props

    const props = {
      title: "register an account with votery!",
      error: error,
      footer: (
        <div>
          {'Already have an account? '}
          <Link to="/login">Login!</Link>
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
            size="s12 m12 l8 offset-l2"
            value={this.props.username}
          >
          </FormInput>

          <FormInput
            icon="lock"
            label="Password"
            name="password"
            onChange={this.props.handleInputChange}
            required
            size="s12 m12 l8 offset-l2"
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