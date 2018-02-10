import React, { Component } from 'react'

import { FormCard } from '../layout'

class UserPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: "",
      error: ""
    }
  }


  render() {

    const layout = {
      title: "My Account",
      error: this.state.error,
      footer: (
        <div>
          {'Some Footer Text Here'}
        </div>
      )
    }

    return (

      <div className="container">
        <div className="row">
          <div className="col s12 m10 offset-m1 xl8 offset-xl2">
            <FormCard
              { ...this.state }
            />
          </div>
        </div>
      </div>

    )
  }

}

export default UserPage