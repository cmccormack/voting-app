import React, { Component, } from 'react'
import { Redirect, } from 'react-router-dom'
import PropTypes from 'prop-types'

import { NewPollForm, } from '../components'

class NewPollPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      choices: [ '', '', ],
      error: "",
      newChoice: "",
      newChoiceFocus: false,
      redirectpath: '#',
      selectedChoiceIndex: 0,
      shortName: "",
      submitted: false,
      title: "",
    }
    this._isMounted = false

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleChoiceDelete = this.handleChoiceDelete.bind(this)
    this.handleChoiceAdd = this.handleChoiceAdd.bind(this)
    this.handleSelectedChoice = this.handleSelectedChoice.bind(this)
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  handleInputChange(e, choice, iter, newState={}) {

    if (choice || choice === '') {
      const choices = [ ...this.state.choices, ]
      choices[iter] = choice
      newState = { choices, }
    } else {
      newState = {
        [e.target.name]: e.target.value,
      }
    }
    newState.error = ''
    this.setState(newState)
  }

  handleChoiceDelete(index) {
    const newChoices = this.state.choices.filter((_, i) =>
      index !== i
    )

    this.setState({ choices: newChoices, })
  }


  handleChoiceAdd(e) {
    e && e.preventDefault()

    const { newChoice: choice, } = this.state

    if (choice) {
      this.setState({
        choices: [ ...this.state.choices, ].concat(choice),
        newChoice: "",
      })
    }

  }

  handleSelectedChoice(index) {
    this.setState({ selectedChoiceIndex: index, })
  }

  handleInputFocus({target: { name, },}) {
    this.setState({ newChoiceFocus: name === 'newChoice', })
  }

  handleInputBlur({target: { name, },}) {
    this.setState({ newChoiceFocus: !(name === 'newChoice'), })
  }

  handleSubmit(e) {
    e.preventDefault()

    if (this.state.newChoiceFocus) {
      return this.handleChoiceAdd()
    }

    this.props.updateAuthStatus(user => {

      if (!user.isAuthenticated) return

      const { title, shortName, choices, selectedChoiceIndex, } = this.state

      fetch("/submit_new_poll", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        cache: "default",
        credentials: "same-origin",
        body: JSON.stringify({ title, shortName, choices, selectedChoiceIndex, }),
      })
      .then(res => res.json()).then(data => {

        // Return early if component not mounted
        if (!this._isMounted) return

        const { success, message, poll={}, } = data
        const { user='', shortName='', } = poll

        const newPollPath = user && success 
          ? `/user/${user}/polls/${shortName}` 
          : ''

        this.setState({
          error: success ? '' : message,
          submitted: success ? true : false,
          redirectpath: newPollPath,
        })
      })
      .catch(console.error)
    })
  }


  render() {

    document.title = "Votery | Create New Poll"

    const {
      redirectpath,
      submitted,
      ...rest
    } = this.state
    
    if (submitted) {
      return <Redirect to={redirectpath} />
    }

    return (
      <NewPollForm
        handleInputChange={ this.handleInputChange }
        handleChoiceDelete={ this.handleChoiceDelete }
        handleChoiceAdd={ this.handleChoiceAdd }
        handleSelectedChoice={ this.handleSelectedChoice }
        handleInputFocus={ this.handleInputFocus }
        handleInputBlur={ this.handleInputBlur }
        handleSubmit={ this.handleSubmit }
        { ...rest }
      />
    )
  }
}

NewPollPage.propTypes = {
  updateAuthStatus: PropTypes.func,
}

export default NewPollPage