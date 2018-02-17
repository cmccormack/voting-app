import React, { Component } from 'react'
import styled from 'styled-components'

import { FormCard, FormRow } from '../layout'
import { IndeterminateProgressBar } from '../utils'

class ViewPollPage extends Component {

  render() {

    const { footer, loaded, poll, error, createdBy } = this.props
    const { title="Poll Not Found.", choices } = poll

    const loadingPoll = (
      <FormCard
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
        error={error}
        footer={createdBy && footer}
        title={title}
        user={createdBy}
      >
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