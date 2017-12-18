import React, { Component } from 'react'
import styled from 'styled-components'


const MainHeader = styled.div.attrs({
  className: "container center teal lighten-5 z-depth-4"
})`
  border-radius: 5px;
  margin-top: 80px;
  padding: 20px;
`

class Main extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <MainHeader>
        <div className="row">
          <div className="col s12 teal-text text-darken-3">
            <h1>Welcome to Votery!</h1>
          </div>
        </div>

        <div className="row">
          <div className="col s12 teal-text text-darken-1">
            <h6>Check out some of the great user-submitted
              polls below, or create your own.  </h6>
            <h6>See if the thing you like
            is better then the thing that other person likes!</h6>
          </div>
        </div>
      </MainHeader>
    )
  }
}

export default Main