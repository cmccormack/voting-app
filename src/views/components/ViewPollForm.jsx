import React, { Component } from 'react'
import styled from 'styled-components'

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
`

class ViewPollPage extends Component {

  render() {

    const { footer, loaded, poll, error, createdBy } = this.props
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

        <FormRow>
          <ChoicesTitle className='col s8 offset-s2 teal-text text-darken-1'>
            Select a choice below to vote on your favorite!
          </ChoicesTitle>
          <Collection className="col s8 offset-s2">
            {
              choices.map(choice => (
                <CollectionItem
                  className="center-align"
                  title={{title: choice.choice, color: "teal-text text-darken-1"}}
                />
              ))
            }
          </Collection>
        </FormRow>
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