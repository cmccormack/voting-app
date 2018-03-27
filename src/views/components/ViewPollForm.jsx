import React, { Component } from 'react'
import styled from 'styled-components'

import { Alert, Chart, FormCard, FormRow } from '../layout'
import { IndeterminateProgressBar } from '../utils'


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
          />
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