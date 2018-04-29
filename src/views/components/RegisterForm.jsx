import React, { Component, } from 'react'
import PropTypes from 'prop-types'

import {
  Alert,
  FormCard,
  FormSubmitButton,
  FormInput,
  FormRow,
} from '../layout'

class RegisterForm extends Component {

  render() {

    const {
      error,
      footer,
      handleInputChange,
      handleSubmit,
      password,
      title,
      username,
    } = this.props

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
        error={ error ? true : false }
        footer={ footer }
        title={ title }
      >
        <form id="register_form" onSubmit={ handleSubmit }>

          <FormRow>
            <FormInput
              icon="account_circle"
              label="Username"
              name="username"
              onChange={ handleInputChange }
              required
              size="s12 l8 offset-l2"
              value={ username }
            >
            </FormInput>
          </FormRow>

          <FormRow>
            <FormInput
              icon="lock"
              label="Password"
              name="password"
              onChange={ handleInputChange }
              required
              size="s12 l8 offset-l2"
              type="password"
              value={ password }
            >
            </FormInput>
          </FormRow>

          <FormRow>
            <FormSubmitButton 
              onClick={ handleSubmit }
              position="right"
              size="s12 l8 offset-l2"
            />
          </FormRow>

        </form>
        
      </FormCard>
    )
  }
}

RegisterForm.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  password: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  username: PropTypes.string,
}

RegisterForm.defaultProps = {
  title: '',
  error: '',
  footer: '',
  password: '',
  username: '',
}

export default RegisterForm