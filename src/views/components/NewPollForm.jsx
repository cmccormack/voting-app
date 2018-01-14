import React, { Component } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import {
  FormCard,
  FormSubmitButton,
  FormInput
} from '../layout'


const PollChoice = props => {

  const { iter, size, choice } = props

  const handleInputChange = e => {
    props.handleInputChange(e, e.target.value, iter)
  }

  return (
    <FormInput
      icon=""
      label={`Choice ${iter + 1}`}
      name={`choice_${iter}`}
      onChange={handleInputChange}
      size={size}
      value={choice}
      maxLength={16}
    />
  )
}


const PollChoices = ({choices, ...props}) => {
  console.log(props)
  return(
    choices.map((choice, iter) => (
      <PollChoice 
        choice={choice}
        iter={iter}
        key={`choice_${iter}`}
        {...props}
      />
    ))
  )
}


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

          <FormInput
            icon=""
            label="Title (e.g. Favorite Superhero)"
            name="title"
            onChange={this.props.handleInputChange}
            required
            size="s12 m12 l8 offset-l2"
            value={this.props.title}
          />

          <FormInput
            icon=""
            label="Short Title (e.g. fav_superhero, optional)"
            name="shortname"
            onChange={this.props.handleInputChange}
            size="s12 m12 l8 offset-l2"
            value={this.props.shortname}
            maxLength={16}
          />

          <PollChoices 
            choices
            size="s6 offset-s2"
            {...this.props}
          />

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