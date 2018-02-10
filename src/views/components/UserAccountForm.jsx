import React, { Component } from 'react'
import styled from 'styled-components'

import {
  FormCard,
  Tabs
} from '../layout'

class UserAccountForm extends Component {

  render() {

    const { title, footer, error } = this.props

    return (
      <FormCard
        title={title}
        footer={footer}
        error={error}
      >
      <Tabs color="teal-text darken-2"/>

      </FormCard>
    )
  }
}

export default UserAccountForm