import React, { Component } from 'react'
import styled from 'styled-components'

import {
  FormCard,
  FormSubmitButton,
  FormInput,
  FormRow,
  IconLink,
  Icon,
  Alert
} from '../layout'


const StyledNewChoiceIcon = styled(Icon)`
  position: absolute;
  line-height: 4.2rem;
`


const StyledChoiceLabel = styled.label`
  right: 0;
  top: 0;
  bottom: 0;
`

const PollChoice = ({
  action,
  choice = '',
  index = -1,
  selectedChoice = 0,
  ...props
}) => {
  
  const handleAction = e => {
    action(e, index)
  }

  const handleSelectedChoice = () => {
    props.handleSelectedChoice(index)
  }

  return (
    <div>
      { index >= 0 &&
      <div className="col s2 right-align">
        <input
          checked={ index===selectedChoice }
          className='with-gap'
          type='radio'
          name='choices'
          id={`choice_${ index }`}
          onChange={handleSelectedChoice}
          value={index}
        />
        <StyledChoiceLabel htmlFor={`choice_${ index }`}></StyledChoiceLabel>
      </div>
      }
    <FormInput
      action={ action && handleAction }
      index={ index }
      size="s8"
      value={ choice }
      { ...props }
    />
    </div>
  )
}


const PollChoices = ({choices, selectedChoice, ...props}) => {

  const handleChoiceDelete = (e, i) => {
    e.preventDefault()
    props.handleChoiceDelete(i)
  }

  return choices.map((choice, i) => (
    <FormRow key={ `choice_${i}` }>
      <PollChoice
        action={ handleChoiceDelete }
        actionIcon="close"
        choice={ choice }
        handleSelectedChoice={ props.handleSelectedChoice }
        index={ i }
        label={ `Choice ${i + 1}` }
        name={ `choice_${i}` }
        onChange={ e => props.handleInputChange(e, e.target.value, i) }
        selectedChoice={ selectedChoice }
        { ...props }
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
    // this.handleChoiceAdd = this.handleChoiceAdd.bind(this)
  }

  // handleChoiceAdd(e) {
  //   e.preventDefault()
  //   this.props.handleChoiceAdd(this.props.newChoice)
  // }

  render() {

    const { error, choices, selectedChoice } = this.props

    const layout = {
      title: "Create New Poll",
      error: error,
      footer: (
        <div>
          {'Some Footer Text Here'}
        </div>
      )
    }

    const alert = (
      <FormRow>
        <Alert
          className="col s8 offset-s2"
          show={error ? true : false}
          type={error ? 'warning' : 'success' }
        >
          <strong>Warning!&nbsp;&nbsp;</strong>{error}
        </Alert>
      </FormRow>
    )

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m10 offset-m1 xl8 offset-xl2">
            <FormCard {...layout} alert={ alert }>
              <form 
                id="new_poll_form"
                onSubmit={this.props.handleSubmit}
              >

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

                {/* Iterate and display existing poll choices */}
                <PollChoices
                  choices={choices}
                  handleChoiceDelete={this.props.handleChoiceDelete}
                  handleInputChange={this.props.handleInputChange}
                  handleSelectedChoice={this.props.handleSelectedChoice}
                  icon=""
                  maxLength={inputLengths.choice.max}
                  selectedChoice={selectedChoice}
                />

                {/* Allow user to enter new poll choice */}
                <FormRow>
                  <PollChoice
                    maxLength={inputLengths.choice.max}
                    name="newChoice"
                    onChange={this.props.handleInputChange}
                    label="New Choice"
                    size="s7 offset-s2"
                    choice={this.props.newChoice}
                  />
                  <div className={"col s3"}>
                    <IconLink
                      title="Click"
                      href="#"
                      onClick={this.props.handleChoiceAdd}
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

                {/* Submit poll */}
                <FormRow>
                  <FormSubmitButton
                    onClick={this.props.handleSubmit}
                    position="right"
                    size="s6 offset-s3"
                  />
                </FormRow>

              </form>

            </FormCard>
          </div>
        </div>
      </div>
    )
  }
}

export default NewPollForm