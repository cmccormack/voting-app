import React, { Component } from 'react'
import styled from 'styled-components'

import { ViewPollForm } from '../components'
import { FormCard, FormRow } from '../layout'
import { IndeterminateProgressBar } from '../utils'
import { getRandomHue, getColorsIncrementHue } from '../../utils/colors'

class ViewPollPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      error: '',
      loaded: false,
      poll: {},
      createdBy: '',
      selectedChoice: null,
    }
    this.handleChoiceSelect = this.handleChoiceSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

        // Create new array of incrementing colors of size poll.choices.length
        const choiceColors = getColorsIncrementHue(
          getRandomHue(),
          {
            length: poll.choices.length,
            increment: 20,
            saturation: 60,
          }
        )

        this.setState({
          choiceColors,
          createdBy: username,
          loaded: true,
          poll,
          selectedChoice: poll.choices[0].choice || null
        })

      })
      .catch(console.error)
  }

  handleChoiceSelect(selectedChoice) {
    this.setState({ selectedChoice })
  }

  handleSubmit(e) {

    const { params } = this.props.match
    const { selectedChoice, poll } = this.state

    if (!poll.choices.map(({choice}) => choice).includes(selectedChoice)) {
      return this.setState({error: `Invalid choice [${selectedChoice}]!`})
    }

    fetch(`/api/${params.user}/polls/${params.poll}`, {
      method: "POST",
      headers: new Headers({'Content-Type': 'application/json'}),
      cache: "default",
      credentials: "same-origin",
      body: JSON.stringify({ selectedChoice })
    })
      .then(res => res.json()).then(({ success, poll, message, username }) => {
        if(!success) {
          this.setState({
            success,
            error: message
          })
        }
      })
  }

  render() {

    const { createdBy } = this.state

    return (
      <ViewPollForm
        { ...this.state }
        footer={ `Created by ${ createdBy }` }
        handleChoiceSelect={ this.handleChoiceSelect }
        handleSubmit={ this.handleSubmit }
      >
      </ViewPollForm>
    )
  }
}

export default ViewPollPage