import React, { Component } from 'react'
import styled from 'styled-components'

import { NewPollForm } from '../components'

class NewPollPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: "",
      shortname: "",
      choices: ['choice1', 'choice2'],
      newChoice: "aaa",
      error: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }


  handleInputChange(e, choice, iter, newState={}){

    if (e.target.name.startsWith('choice')) {
      const choices = [...this.state.choices]
      choices[iter] = choice
      newState = {choices}
    } else {
      newState = {
        [e.target.name]: e.target.value
      }
    }
    this.setState(newState)
    console.log(this.state)
  }



  handleSubmit(event) {
    event.preventDefault()

    const body = {
      title: this.state.title
    }
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    fetch("/createnewpoll", {
      method: "POST",
      headers: myHeaders,
      cache: "default",
      credentials: "same-origin",
      body: JSON.stringify(body)
    })
      .then(res => res.json()).then(data => {
        // Response from poll submission
        console.log(data)
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