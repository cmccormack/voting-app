import React, { Component } from 'react'

import { UserAccountForm } from '../components'

class UserPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: "",
      loaded: false,
      polls: []
    }
  }

  updateTabs() {
    $(document).ready(() => { $('ul.tabs').tabs() })
  }

  componentDidMount() {

    fetch(`/api/${this.props.user}/polls`, {
      method: "GET",
      cache: "default",
      credentials: "same-origin"
    })
      .then(res => res.json()).then(({success, polls, message}) => {
        console.log(polls)

        if (!success) {
          return this.setState({ error: message})
        }

        this.setState({ polls, loaded: true }, this.updateTabs)
        
      })
      .catch(console.error)
  }

  render() {

    const { loaded, ...state } = this.state

    return (

      <div className="container">
        <div className="row">
          <div className="col s12 m10 offset-m1 xl8 offset-xl2">
            <UserAccountForm
              footer="Some Footer Text Here"
              loaded={ loaded }
              title="My Account"
              updateTabs={this.updateTabs}
              { ...state }
            />
          </div>
        </div>
      </div>

    )
  }

}

export default UserPage