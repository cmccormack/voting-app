import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import {
  Alert,
  Chart,
  Collection,
  CollectionItem,
  FormCard,
  FormInput,
  FormRow,
  FormSubmitButton,
} from '../layout'

import {
  CharacterCounter,
  IndeterminateProgressBar,
} from '../utils'

const ChoicesTitle = styled.div`
  text-align: center;
  font-size: 1.6rem;
  text-transform: capitalize;
`

const ChoicesSection = styled.div`
  margin-top: 40px;
`

const NewChoiceInput = styled.input`
  border-bottom: none !important;
  height: inherit !important;
  margin-bottom: 0 !important;
`

const NewChoiceInputWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 66%;
`

const VoteCollectionItem = ({ selectedChoice, title, ...props }) => (
  <CollectionItem
    actions={[
      {
        icon: selectedChoice === title
          ? 'radio_button_checked'
          : 'radio_button_unchecked',
        target: "#",
        color: "teal-text text-lighten-2",
        handler: props.handleChoiceSelect.bind(null, title)
      }
    ]}
    key={ title }
    title={{
      title,
      color: "teal-text text-darken-1"
    }}
  >
    { props.children }
  </CollectionItem>
)


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
      newChoice,
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

              {/* // Allow user to add their own poll choice */}
              <VoteCollectionItem
                handleChoiceSelect={ handleChoiceSelect }
                selectedChoice={ selectedChoice }
              >
                <NewChoiceInputWrapper>
                  <NewChoiceInput
                    className='teal-text text-darken-1'
                    value={ newChoice }
                    onChange={ this.props.handleInputChange }
                    placeholder="Add New Choice!"
                  />
                  <CharacterCounter
                    count={ newChoice.length }
                    max={ 32 }
                    top={ 0 }
                    bottom={ 0 }
                    right={ '-20px' }
                    lineHeight={ 1.4 }
                  />
                </NewChoiceInputWrapper>
              </VoteCollectionItem>

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