import React, { Component } from 'react'
import styled from 'styled-components'

import { NewPollForm } from '../components'

class NewPollPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: "",
      shortName: "",
      choices: ['choice1', 'choice2'],
      newChoice: "",
      error: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleChoiceDelete = this.handleChoiceDelete.bind(this)
    this.handleChoiceAdd = this.handleChoiceAdd.bind(this)
  }


  handleInputChange(e, choice, iter, newState={}) {

    if (choice || choice === '') {
      const choices = [...this.state.choices]
      choices[iter] = choice
      newState = {choices}
    } else {
      newState = {
        [e.target.name]: e.target.value
      }
    }
    newState.error = ''
    this.setState(newState)
    // console.log(this.state)
  }

  handleChoiceDelete(index) {
    const newChoices = this.state.choices.filter((_, i) =>
      index !== i
    )

    this.setState({choices: newChoices})
  }

  handleChoiceAdd(choice) {

    if (choice){
      const choices = [...this.state.choices].concat(choice)
      this.setState({choices, newChoice: ""})
    }

  }



  handleSubmit(event) {
    event.preventDefault()

    const { title, shortName, choices } = this.state
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    fetch("/submit_new_poll", {
      method: "POST",
      headers: myHeaders,
      cache: "default",
      credentials: "same-origin",
      body: JSON.stringify({ title, shortName, choices })
    })
      .then(res => res.json()).then(data => {
        // Response from poll submission
        console.log(data)
        this.setState({error: data.success ? '' : data.message})
      })
      .catch(console.error)
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m10 offset-m1 xl8 offset-xl2">
            <NewPollForm
              handleInputChange={this.handleInputChange}
              handleChoiceDelete={this.handleChoiceDelete}
              handleChoiceAdd={this.handleChoiceAdd}
              handleSubmit={this.handleSubmit}
              { ...this.state }
            />
          </div>
        </div>
      </div>
    )
  }
}


export default NewPollPage