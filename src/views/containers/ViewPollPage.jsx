import React, { Component } from 'react'
import styled from 'styled-components'

import { ViewPollForm } from '../components'
import { FormCard, FormRow } from '../layout'
import { IndeterminateProgressBar } from '../utils'

class ViewPollPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: "",
      loaded: false,
      poll: {}
    }
  }

  componentDidMount() {
    const { user, poll } = this.props.match.params
    fetch(`/api/${user}/polls/${poll}`, {
      method: "GET",
      cache: "default",
      credentials: "same-origin"
    })
      .then(res => res.json()).then(({ success, poll, message }) => {

        if (!success) {
          return this.setState({ error: message })
        }

        this.setState({ polls, loaded: true })

      })
      .catch(console.error)
  }

  render() {

    const { match, error, user } = this.props
    const { params } = match

    const title = params.poll
    const footer = `Created by ${params.user}`

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
      <ViewPollForm
        error={error}
        footer={footer}
        title={title}
        user={user}
      />
    )

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m10 offset-m1 xl8 offset-xl2">
            { !this.state.loaded
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