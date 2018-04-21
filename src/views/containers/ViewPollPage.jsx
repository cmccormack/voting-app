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
      seedColor: 0,
      createdBy: '',
      error: '',
      loaded: false,
      poll: {},
      newChoice: '',
      selectedChoice: null,
      selectedIndex: 0,
      timeRemaining: 0,
    }

    this.chartColorOptions = {
      saturation: 40,
      lightness: 60,
      increment: 20,
    }
    this.intervalID = 0

    this.handleChoiceSelect = this.handleChoiceSelect.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {

    const { user, poll } = this.props.match.params
    const { increment, lightness, saturation } = this.chartColorOptions

    fetch(`/api/${user}/polls/${poll}`, {
      method: "GET",
      cache: "default",
      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(({ success, poll, message, username }) => {
        if (!success) return this.setState({ loaded: true, error: message })
        
        const { choices=[], seedColor=0 } = poll
        this.setState({
          choiceColors: this.getColorArray(choices.length, seedColor),
          seedColor: seedColor,
          createdBy: username,
          loaded: true,
          poll,
          selectedChoice: choices[0].choice,
          selectedIndex: 0
        })

      })
      .catch(console.error)
  }

  getColorArray(length=0, hue=0) {

    const { increment, lightness, saturation } = this.chartColorOptions
    return getColorsIncrementHue(hue, {
        length,
        increment,
        saturation,
        lightness,
      }
    )
  }

  handleChoiceSelect(selectedIndex, selectedChoice) {
    const { error, timeRemaining } = this.state
    this.setState({
      error: timeRemaining ? error : '',
      selectedIndex,
      selectedChoice,
    })
  }

  handleInputChange(index, {target: { value }}) {
    const { error, timeRemaining } = this.state
    this.setState({
      error: timeRemaining ? error : '',
      newChoice: value,
      selectedChoice: value,
      selectedIndex: index,
    })
  }

  timeRemainingMessage(time) {
    const { timeRemaining } = this.state
    return `You can vote again in ${
      Math.floor((time ? time : timeRemaining) / 1000)
    } seconds`
  }

  countdownTimer(decrement=1000) {
    clearInterval(this.intervalID)
    
    this.intervalID = setInterval(() => {
      
      const { timeRemaining } = this.state
      if (timeRemaining > 0) {
        return this.setState({
          error: this.timeRemainingMessage(),
          timeRemaining: timeRemaining - decrement,
        })
      }

      clearInterval(this.intervalID)
      this.setState({
        timeRemaining: 0,
        error: '',
      })
      
    }, decrement)

    return this.timeRemainingMessage()
  }


  handleSubmit(e) {

    const { params } = this.props.match
    const { newChoice, selectedChoice, selectedIndex, poll } = this.state
    
    fetch(`/api/${params.user}/polls/${params.poll}`, {
      method: "POST",
      headers: new Headers({'Content-Type': 'application/json'}),
      cache: "default",
      credentials: "same-origin",
      body: JSON.stringify({ selectedChoice, selectedIndex })
    })
      .then(res => res.json())
      .then(response => {
        const { success, poll={}, message='', username='', error={} } = response
        const { timeRemaining=0 } = error
        const { choices=[], seedColor=0 } = poll
        console.log(timeRemaining)
        this.setState({
          choiceColors: success ? this.getColorArray(choices.length, seedColor) : this.state.choiceColors,
          error: timeRemaining 
            ? this.timeRemainingMessage(timeRemaining)
            : message,
          newChoice: success ? '' : newChoice,
          poll: success ? poll : this.state.poll,
          success,
          timeRemaining,
        }, this.countdownTimer)
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