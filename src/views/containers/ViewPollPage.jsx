import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Scroll from 'react-scroll'

import { ViewPollForm } from '../components'
import { FormCard, FormRow } from '../layout'
import { IndeterminateProgressBar } from '../utils'
import { getRandomHue, getColorsIncrementHue } from '../../utils/colors'

class ViewPollPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      choiceColors: [],
      createdBy: '',
      error: '',
      loaded: false,
      newChoice: '',
      poll: {},
      seedColor: 0,
      selectedIndex: 0,
      selectedChoice: null,
      showError: false,
      showVoteSubmitted: false,
      timeRemaining: 0,
      voteSubmitted: '',
    }

    this.chartColorOptions = {
      increment: 20,
      lightness: 60,
      saturation: 40,
    }
    this._isMounted = false
    this.intervalID = 0

    this.handleChoiceSelect = this.handleChoiceSelect.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {

    this._isMounted = true

    const { user, poll } = this.props.match.params
    const { increment, lightness, saturation } = this.chartColorOptions

    fetch(`/api/${user}/polls/${poll}`, {
      method: "GET",
      cache: "default",
      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(({ success, poll, message, username }) => {
        if (!this._isMounted) return
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

  componentWillUnmount() {
    this._isMounted = false
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

  handleChoiceSelect(index, choice) {
    const { error, newChoice, timeRemaining, selectedIndex } = this.state
    this.setState({
      selectedIndex: index,
      selectedChoice: choice,
      newChoice: selectedIndex === index ? newChoice : '',
      showError: false,
      error: '',
      showVoteSubmitted: false,
      voteSubmitted: '',
    })
  }

  handleInputChange(index, {target: { value }}) {
    const { error, timeRemaining } = this.state
    this.setState({
      newChoice: value,
      selectedChoice: value,
      selectedIndex: index,
      showError: false,
      error: '',
      showVoteSubmitted: false,
      voteSubmitted: '',
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

      if (!this._isMounted) return clearInterval(this.intervalID)

      const { showError, timeRemaining } = this.state

      if (timeRemaining > 0) {
        return this.setState({
          error: showError ? this.timeRemainingMessage() : '',
          timeRemaining: timeRemaining - decrement,
        })
      }

      clearInterval(this.intervalID)
      this.setState({
        timeRemaining: 0,
        error: '',
        showError: false,
        showVoteSubmitted: false,
      })
      
    }, decrement)

    return this.timeRemainingMessage()
  }


  handleSubmit(e) {

    Scroll.animateScroll.scrollToTop({
      smooth: 'easeOutQuad',
      duration: 400
    })

    if (this.state.timeRemaining > 0) {
      return this.setState({ showError: true })
    }

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
        if (!this._isMounted) return
        const { success, poll={}, message='', username='', error={} } = response
        const { timeRemaining=0 } = error
        const { choices=[], seedColor=0 } = poll

        this.setState({
          choiceColors: success 
            ? this.getColorArray(choices.length, seedColor) 
            : this.state.choiceColors,
          error: timeRemaining 
            ? this.timeRemainingMessage(timeRemaining)
            : message,
          newChoice: success ? '' : newChoice,
          poll: success ? poll : this.state.poll,
          showVoteSubmitted: success ? true : false,
          success,
          timeRemaining,
          voteSubmitted: success
            ? selectedChoice
            : '',
        }, this.countdownTimer)
      })
  }

  render() {

    const { createdBy, newChoice, poll } = this.state
    document.title = `Votery | ${poll.title}`

    return (
      <ViewPollForm
        { ...this.state }
        footer={ 
          <span>
            {'Created by '}
            <Link to={`/user/${createdBy}/polls`}>{createdBy}</Link>
          </span>
        }
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