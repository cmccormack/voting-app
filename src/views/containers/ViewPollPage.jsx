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
      choiceColors: [],
      colorSeed: getRandomHue(),
      createdBy: '',
      error: '',
      loaded: false,
      poll: {},
      newChoice: '',
      selectedChoice: null,
      selectedIndex: 0,
    }

    this.chartColorOptions = {
      saturation: 40,
      lightness: 60,
      increment: 20,
    }

    this.handleChoiceSelect = this.handleChoiceSelect.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
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

        this.setState({
          choiceColors: this.getUpdatedPollColors(poll.choices.length),
          createdBy: username,
          loaded: true,
          poll,
          selectedChoice: '',
          selectedIndex: 0
        })

      })
      .catch(console.error)
  }

  getUpdatedPollColors(length) {
    const { increment, lightness, saturation, } = this.chartColorOptions
    const h = this.state.colorSeed
    return getColorsIncrementHue(this.state.colorSeed, {
      length,
      increment,
      saturation,
      lightness,
    })
  }

  handleChoiceSelect(selectedIndex, selectedChoice) {
    this.setState({ selectedIndex, selectedChoice })
  }

  handleInputChange(index, {target: { value }}) {
    this.setState({
      newChoice: value,
      selectedChoice: value,
      selectedIndex: index
    })
  }

  handleSubmit(e) {

    const { params } = this.props.match
    const { selectedChoice, selectedIndex, poll } = this.state
    
    fetch(`/api/${params.user}/polls/${params.poll}`, {
      method: "POST",
      headers: new Headers({'Content-Type': 'application/json'}),
      cache: "default",
      credentials: "same-origin",
      body: JSON.stringify({ selectedChoice, selectedIndex })
    })
      .then(res => res.json()).then(({ success, poll, message, username }) => {
        success && window.scrollTo(0,50)
        this.setState({
          choiceColors: this.getUpdatedPollColors(poll.choices.length),
          error: message,
          newChoice: success ? '' : newChoice,
          poll: success ? poll : this.state.poll,
          success,
        })
      })
  }

  render() {

    const { createdBy, newChoice } = this.state

    return (
      <ViewPollForm
        { ...this.state }
        footer={ `Created by ${ createdBy }` }
        handleChoiceSelect={ this.handleChoiceSelect }
        handleInputChange={ this.handleInputChange }
        handleSubmit={ this.handleSubmit }
        newChoice={ newChoice }
      >
      </ViewPollForm>
    )
  }
}

export default ViewPollPage