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
        <form id="new_poll_form" onSubmit={this.props.handleSubmit}>

          <FormInput
            icon=""
            label="Title (e.g. Favorite Superhero)"
            name="title"
            onChange={this.props.handleInputChange}
            required
            value={this.props.title}
          >
          </FormInput>

          <FormInput
            icon=""
            label="Short Title (e.g. fav_superhero, optional)"
            name="shortname"
            onChange={this.props.handleInputChange}
            value={this.props.shortname}
            maxLength={16}
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

export default NewPollForm