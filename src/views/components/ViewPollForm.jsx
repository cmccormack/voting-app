import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import {
  Alert,
  Chart,
  Collection,
  CollectionItem,
  FormCard,
  FormRow,
  FormSubmitButton,
} from '../layout'
import { IndeterminateProgressBar } from '../utils'

const ChoicesTitle = styled.div`
  text-align: center;
  font-size: 1.6rem;
  text-transform: capitalize;
`

const ChoicesSection = styled.div`
  margin-top: 40px;
`


class ViewPollForm extends Component {

  render() {

    const {
      choiceColors,
      createdBy,
      error,
      footer,
      handleChoiceSelect,
      handleSubmit,
      loaded,
      poll,
      selectedChoice,
    } = this.props
    const { title="Poll Not Found.", choices=[] } = poll

    const alert = (
      <FormRow>
        <Alert
          className="col s8 offset-s2"
          show={error ? true : false}
          type={error ? 'warning' : 'success'}
        >
          { error }
        </Alert>
      </FormRow>
    )

    const loadingPoll = (
      <FormCard
        alert={ alert }
        footer={'Please wait while the data is being accessed.'}
        title={'Loading Poll...'}
      >
        <FormRow>
          <div className="col s8 offset-s2">
            <IndeterminateProgressBar />
          </div>
        </FormRow>
      </FormCard>
    )



    const body = (
      <FormCard
        error={ error }
        footer={ createdBy && footer }
        title={ title }
        user={ createdBy }
        alert={ alert }
      >
        <FormRow>
          <Chart
            choices={ choices }
            className="col s12 m10 offset-m1"
            colors={choiceColors}
          />
        </FormRow>

        <ChoicesSection>
          <FormRow>
            <ChoicesTitle 
              className='col s8 offset-s2 teal-text text-darken-1'
            >
              Select a choice below to vote on your favorite!
            </ChoicesTitle>
            <Collection className="col s8 offset-s2">
              {
                choices.map(choice => (
                  <CollectionItem
                    actions={[
                      {
                        icon: selectedChoice === choice.choice
                          ? 'radio_button_checked'
                          : 'radio_button_unchecked',
                        target: "#",
                        color: "teal-text text-lighten-2",
                        handler: handleChoiceSelect.bind(null, choice.choice)
                      }
                    ]}
                    key={choice.choice}
                    title={{
                      title: choice.choice,
                      color: "teal-text text-darken-1"
                    }}
                  />
                ))
              }
            </Collection>
          </FormRow>
          <FormRow>
            <FormSubmitButton
              buttonText="Vote!"
              icon="done_all"
              onClick={this.props.handleSubmit}
              position="right"
              size="s8 offset-s2"
            />
          </FormRow>
        </ChoicesSection>
      </FormCard>
    )

    return (

      <div className="container">
        <div className="row">
          <div className="col s12 m10 offset-m1 xl8 offset-xl2">
            {!this.props.loaded
              ? loadingPoll
              : body
            }
          </div>
        </div>
      </div>

    )
  }
}

export default ViewPollForm