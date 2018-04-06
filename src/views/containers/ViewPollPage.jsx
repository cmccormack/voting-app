import React, { Component } from 'react'
import styled from 'styled-components'

import { ViewPollForm } from '../components'
import { FormCard, FormRow } from '../layout'
import { IndeterminateProgressBar } from '../utils'
import { getColorsIncrementHue } from '../../utils/colors'

class ViewPollPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      error: "",
      loaded: false,
      poll: {},
      createdBy: '',
      selectedChoice: null,
    }
    this.handleChoiceToggle = this.handleChoiceToggle.bind(this)
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
          poll.choices.length,
          180 / poll.choices.length,
          60,
          50
        )

        this.setState({
          poll,
          loaded: true,
          choiceColors,
          createdBy: username,
        })

      })
      .catch(console.error)
  }

  handleChoiceToggle(selectedChoice) {
    this.setState({
      selectedChoice
    }, ()=> {console.log(this.state.selectedChoice)})
  }

  render() {

    const { createdBy } = this.state

    return (
      <ViewPollForm
        { ...this.state }
        footer={ `Created by ${ createdBy }` }
        handleChoiceToggle={ this.handleChoiceToggle }
      >
      </ViewPollForm>
    )
  }
}

export default ViewPollPage