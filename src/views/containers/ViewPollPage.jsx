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
      poll: {},
      createdBy: ''
    }
  }

  componentDidMount() {

    const { user, poll } = this.props.match.params

    fetch(`/api/${user}/polls/${poll}`, {
      method: "GET",
      cache: "default",
      credentials: "same-origin"
    })
      .then(res => res.json()).then(({ success, poll, message, username }) => {
        if (!success) return this.setState({ loaded: true, error: message })
        this.setState({
          poll,
          loaded: true,
          createdBy: username
        })

      })
      .catch(console.error)
  }

  render() {

    const { createdBy } = this.state

    return (
      <ViewPollForm
        { ...this.state }
        footer={`Created by ${createdBy}`}
      >
      </ViewPollForm>
    )
  }
}

export default ViewPollPage