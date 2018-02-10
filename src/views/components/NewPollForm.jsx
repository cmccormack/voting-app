import React, { Component } from 'react'
import styled from 'styled-components'

import {
  FormCard,
  FormSubmitButton,
  FormInput,
  FormRow,
  IconLink,
  Icon
} from '../layout'


const StyledNewChoiceIcon = styled(Icon)`
  position: absolute;
  line-height: 4.2rem;
`

const PollChoice = ({ action, index = -1, choice = '', ...props }) => {
  
  const handleAction = e => {
    action(e, index)
  }

  return (
    <FormInput
      action={ action && handleAction }
      index={ index }
      value={ choice }
      { ...props }
    />
  )
}


const PollChoices = ({choices, ...props}) => {

  const handleChoiceDelete = (e, i) => {
    e.preventDefault()
    props.handleChoiceDelete(i)
  }

  return choices.map((choice, i) => (
    <FormRow key={`choice_${i}`}>
      <PollChoice
        action={ handleChoiceDelete }
        actionIcon="close"
        index={i}
        choice={choice}
        label={`Choice ${i + 1}`}
        onChange={e => props.handleInputChange(e, e.target.value, i)}
        name={`choice_${i}`}
        {...props}
      />
    </FormRow>
  ))
}

const inputLengths = {
  title: { min: 4, max: 64 },
  shortName: { min: 0, max: 16 },
  choices: { min: 2, max: undefined },
  choice: { min: 1, max: 32 }
}


class NewPollForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      newChoice: this.props.newChoice
    }
    this.handleChoiceAdd = this.handleChoiceAdd.bind(this)
  }

  handleChoiceAdd(e) {
    e.preventDefault()
    this.props.handleChoiceAdd(this.props.newChoice)
  }

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
              maxLength={inputLengths.title.max}
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
              label="Short Title (e.g. fav_superhero) (optional)"
              maxLength={inputLengths.shortName.max}
              name="shortName"
              onChange={this.props.handleInputChange}
              size="s12 m12 l8 offset-l2"
              value={this.props.shortName}
            />
          </FormRow>

          <PollChoices
            choices={choices}
            handleChoiceDelete={this.props.handleChoiceDelete}
            handleInputChange={this.props.handleInputChange}
            icon=""
            maxLength={inputLengths.choice.max}
            size="s6 offset-s3"
          />

          <FormRow>
            <PollChoice
              maxLength={inputLengths.choice.max}
              name="newChoice"
              onChange={this.props.handleInputChange}
              label="New Choice"
              size="s6 offset-s3"
              choice={this.props.newChoice}
            />
            <div className={"col s3"}>
              <IconLink
                title="Click"
                href="#"
                onClick={this.handleChoiceAdd}
                Icon={<StyledNewChoiceIcon
                  className="material-icons"
                  fontSize="48px"
                  color="teal-text text-darken-1"
                >
                  {"add_circle_outline"}
                </StyledNewChoiceIcon>}
              >
              </IconLink>
            </div>
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