import React, { Component, } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  Alert,
  Chart,
  Collection,
  CollectionItem,
  FormCard,
  FormRow,
  FormSubmitButton,
} from '../layout'

import {
  CharacterCounter,
  IndeterminateProgressBar,
} from '../utils'

const ChoicesTitle = styled.div`
  text-align: center;
  font-size: 1rem;
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

const VoteCollectionItem = ({
  children,
  choice,
  handleChoiceSelect,
  index,
  selectedIndex,
  title,
}) => (
  <CollectionItem
    actions={[
      {
        icon: selectedIndex === index
          ? 'radio_button_checked'
          : 'radio_button_unchecked',
        target: "#",
        color: "teal-text text-lighten-2",
        handler: handleChoiceSelect.bind(null, index, choice),
      },
    ]}
    title={{
      color: "teal-text text-darken-1",
      text:  title,
    }}
  >
    { children }
  </CollectionItem>
)

VoteCollectionItem.propTypes = { 
  children: PropTypes.any,
  choice: PropTypes.string,
  handleChoiceSelect: PropTypes.func,
  index: PropTypes.number,
  selectedChoice: PropTypes.string,
  selectedIndex: PropTypes.number,
  title: PropTypes.string,
}

VoteCollectionItem.defaultProps = {
  choice: '',
  index: 0,
  selectedChoice: '',
  selectedIndex: 0,
  title: '',
}


const ViewPollForm = (props) => {

  const {
    choiceColors,
    createdBy,
    error,
    footer,
    handleChoiceSelect,
    handleInputChange,
    handleSubmit,
    loaded,
    loggedIn,
    newChoice,
    newChoiceLengths,
    poll,
    selectedChoice,
    selectedIndex,
    showError,
    voteSubmitted,
    showVoteSubmitted,
  } = props
  
  const { title="Poll Not Found.", choices=[], } = poll

  const voteSubmittedMsg = (
    <span>
      {'You successfully voted for '}
      <b>{voteSubmitted}</b>{'!'}
    </span>
  )

  const alert = (
      <Alert
        className="col s8 offset-s2"
        show={showError || showVoteSubmitted ? true : false}
        type={showError ? 'warning' : 'success'}
      >
        { showError ? error : showVoteSubmitted ? voteSubmittedMsg : null }
      </Alert>
  )

  const loadingPoll = (
    <FormCard
      alert={ alert }
      footer={'Please wait while the data is being accessed.'}
      title={'Loading Poll...'}
    >
      <FormRow/>
      <FormRow>
        <div className="col s8 offset-s2">
          <IndeterminateProgressBar />
        </div>
      </FormRow>
    </FormCard>
  )

  const body = (
    <FormCard
      error={ showError || showVoteSubmitted }
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
        <FormRow align="left">
          <ChoicesTitle 
            className='col s8 offset-s2 teal-text text-darken-1'
          >
            Select a choice below to vote on your favorite!
          </ChoicesTitle>
          <Collection className="col s10 offset-s1 xl8 offset-xl2">
            {
              choices.map(({ choice, }, i) => (
                <VoteCollectionItem
                  choice={ choice }
                  handleChoiceSelect={ handleChoiceSelect }
                  index={ i }
                  key={ choice}
                  selectedChoice={ selectedChoice }
                  selectedIndex={ selectedIndex }
                  title={ choice }
                />
              ))
            }

            {/* // Allow user to add their own poll choice */}
            { loggedIn &&
              <VoteCollectionItem
                choice={ newChoice }
                handleChoiceSelect={ handleChoiceSelect }
                index={ choices.length }
                selectedChoice={ selectedChoice }
                selectedIndex={ selectedIndex }
              >
                <NewChoiceInputWrapper>
                  <NewChoiceInput
                    className='teal-text text-darken-1'
                    maxLength={ newChoiceLengths.max }
                    minLength={ newChoiceLengths.min }
                    value={ newChoice }
                    onChange={ handleInputChange.bind(null, choices.length) }
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
            }

          </Collection>
        </FormRow>
        <FormRow>
          <FormSubmitButton
            buttonText="Vote!"
            icon="done_all"
            onClick={ handleSubmit }
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
          {!loaded
            ? loadingPoll
            : body
          }
        </div>
      </div>
    </div>

  )
}



ViewPollForm.propTypes = {
  children: PropTypes.element,
  choiceColors: PropTypes.arrayOf(PropTypes.string),
  createdBy: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  handleChoiceSelect: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  loaded: PropTypes.bool,
  loggedIn: PropTypes.bool,
  newChoice: PropTypes.string,
  newChoiceLengths: PropTypes.object,
  poll: PropTypes.object,
  selectedChoice: PropTypes.string,
  selectedIndex: PropTypes.number,
  showError: PropTypes.bool,
  voteSubmitted: PropTypes.string,
  showVoteSubmitted: PropTypes.bool,
}

ViewPollForm.defaultProps = {
  choiceColors: [],
  createdBy: '',
  error: '',
  footer: '',
  loaded: false,
  loggedIn: false,
  newChoice: '',
  newChoiceLengths: { min: 1, max: 32, },
  poll: {},
  selectedChoice: '',
  selectedIndex: 0,
  showError: false,
  voteSubmitted: false,
  showVoteSubmitted: false,
}

export default ViewPollForm