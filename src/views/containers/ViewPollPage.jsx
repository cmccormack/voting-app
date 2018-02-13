import React, { Component } from 'react'
import styled from 'styled-components'

class ViewPollPage extends Component {

  render() {

    const { match: { params: { user, poll } } } = this.props

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m10 offset-m1 xl8 offset-xl2">
            {/* <UserAccountForm
              error={error}
              footer={footer}
              loaded={loaded}
              polls={polls}
              title={title}
              updateTabs={this.updateTabs}
              user={user}
            /> */}
          </div>
        </div>
      </div>
    )
  }
}

export default ViewPollPage