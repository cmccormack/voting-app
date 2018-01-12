import React, { Component } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import {
  FormCard,
  FormSubmitButton,
  FormInput
} from '../layout'

class NewPollForm extends Component {

  render() {

    const { error } = this.props

    const props = {
      title: "Create New Poll",
      error: error,
      footer: (
        <div>
          {'Some Footer Text Here'}
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