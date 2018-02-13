import React, { Component } from 'react'
import styled from 'styled-components'

import { FormCard } from '../layout'
class ViewPollPage extends Component {

  render() {

    const { title, footer } = this.props
    console.log(this.props)
    return (
      <FormCard 
        footer={ footer }
        title={ title }
      >

      </FormCard>

    )
  }
}

export default ViewPollPage