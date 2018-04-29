import React from 'react'
import PropTypes from 'prop-types'

import {
  Alert,
  FormCard,
  FormSubmitButton,
  FormInput,
  FormRow,
} from '../layout'

const LoginForm = (props) => {
  
  const { title, footer, error, } = props

  const alert = (
    <FormRow>
      <Alert
        className="col s8 offset-s2"
        show={ error ? true : false }
        type={ error ? 'warning' : 'success' }
      >
        { error }
      </Alert>
    </FormRow>
  )

  return (
    <FormCard
      title={ title }
      footer={ footer }
      error={ error ? true : false }
      alert={ alert }
    >
      <form id="login_form" onSubmit={ props.handleSubmit }>

        <FormRow>
          <FormInput
            icon="account_circle"
            label="Username"
            name="username"
            onChange={ props.handleInputChange }
            required
            size="s12 l8 offset-l2"
            value={ props.username }
          />
        </FormRow>

        <FormRow>
          <FormInput
            icon="lock"
            label="Password"
            name="password"
            onChange={ props.handleInputChange }
            required
            size="s12 l8 offset-l2"
            type="password"
            value={ props.password }
          >
          </FormInput>
        </FormRow>

        <FormRow>
          <FormSubmitButton
            onClick={ props.handleSubmit }
            position="right"
            size="s12 l8 offset-l2"
          />
        </FormRow>

      </form>

    </FormCard>
  )
}

LoginForm.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  handleSubmit: PropTypes.func,
  handleInputChange: PropTypes.func,
  password: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  username: PropTypes.string,
}

export default LoginForm