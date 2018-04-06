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

class ViewPollPage extends Component {

  render() {

    const {
      createdBy,
      error,
      footer,
      handleChoiceToggle,
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
          {error}
        </Alert>
      </FormRow>
    )

    const loadingPoll = (
      <FormCard
        footer={'Please wait while the data is being accessed.'}
        title={'Loading Poll...'}
        alert={ alert }
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
        error={error}
        footer={createdBy && footer}
        title={title}
        user={createdBy}
      >
        <FormRow>
          <Chart
            choices={ choices }
            className="col s12 m10 offset-m1"
          />
        </FormRow>

        <ChoicesSection>
          <FormRow>
            <ChoicesTitle className='col s8 offset-s2 teal-text text-darken-1'>
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
                        handler: handleChoiceToggle.bind(null, choice.choice)
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

export default ViewPollPage