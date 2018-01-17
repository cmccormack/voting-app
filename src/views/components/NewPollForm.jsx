import React, { Component } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import {
  FormCard,
  FormSubmitButton,
  FormInput,
  FormRow
} from '../layout'


const PollChoices = ({choices, ...props}) => (
  choices.map((choice, iter) => (
    <FormRow>
      <FormInput 
        choice={choice}
        iter={iter}
        key={`choice_${iter}`}
        label={`Choice ${iter + 1}`}
        name={`choice_${iter}`}
        onChange={e => props.handleInputChange(e, e.target.value, iter)}
        value={choice}
        {...props}
      />
      <div className="btn">Delete</div>
    </FormRow>
  ))
)


class NewPollForm extends Component {

  render() {

    const { error, choices } = this.props

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

          <FormRow>
            <FormInput
              icon=""
              label="Title (e.g. Favorite Superhero)"
              name="title"
              onChange={this.props.handleInputChange}
              required
              size="s12 m12 l8 offset-l2"
              value={this.props.title}
            />
          </FormRow>

          <FormRow>
            <FormInput
              icon=""
              label="Short Title (e.g. fav_superhero, optional)"
              maxLength={16}
              name="shortname"
              onChange={this.props.handleInputChange}
              size="s12 m12 l8 offset-l2"
              value={this.props.shortname}
            />
          </FormRow>

          <PollChoices 
            choices
            icon=""
            maxLength={32}
            size="s6 offset-s2"
            {...this.props}
          />

          <FormRow>
            <FormSubmitButton
              onClick={this.props.handleSubmit}
              position="right"
            />
          </FormRow>

        </form>

      </FormCard>
    )
  }
}

export default NewPollForm