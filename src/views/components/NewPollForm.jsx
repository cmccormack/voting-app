import React, { Component } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import {
  FormCard,
  FormSubmitButton,
  FormInput,
  FormRow
} from '../layout'

const PollChoice = ({ index=-1, choice='', ...props }) => (
  <FormInput
    index={ index }
    onChange={ e => props.handleInputChange(e, e.target.value, index) }
    value={ choice }
    { ...props }
  />
)


const PollChoices = ({choices, ...props}) => (
  choices.map((choice, i) => (
    <FormRow key={`choice_${i}`}>
      <PollChoice
        index={i}
        choice={choice}
        label={`Choice ${i + 1}`}
        name={`choice_${i}`}
        {...props}
      />
    </FormRow>
  ))
)


class NewPollForm extends Component {

  render() {

    const { error, choices } = this.props

    const layout = {
      title: "Create New Poll",
      error: error,
      footer: (
        <div>
          {'Some Footer Text Here'}
        </div>
      )
    }

    return (
      <FormCard {...layout}>
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
            action={this.props.handleChoiceDelete}
            actionIcon="close"
            choices={choices}
            handleChoiceDelete={this.props.handleChoiceDelete}
            handleInputChange={this.props.handleInputChange}
            icon=""
            maxLength={32}
            size="s6 offset-s3"
          />

          <FormRow>
            <PollChoice
              action={ e => e.target.value = '' }
              actionIcon='close'
              handleInputChange={this.props.handleInputChange}
              name="new_choice"
              label="New Choice"
              size="s6 offset-s3"
              choice={this.props.newChoice}
            />
          </FormRow>

          

          <FormRow>
            <FormSubmitButton
              onClick={this.props.handleSubmit}
              position="right"
              size="s6 offset-s3"
            />
          </FormRow>

        </form>

      </FormCard>
    )
  }
}

export default NewPollForm