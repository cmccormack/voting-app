import React, { Component } from 'react'

import { UserAccountForm } from '../components'

class UserPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: ""
    }
  }


  render() {

    return (

      <div className="container">
        <div className="row">
          <div className="col s12 m10 offset-m1 xl8 offset-xl2">
            <UserAccountForm
              title="My Account"
              footer="Some Footer Text Here"
              { ...this.state }
            />
          </div>
        </div>
      </div>

    )
  }

}

export default UserPage