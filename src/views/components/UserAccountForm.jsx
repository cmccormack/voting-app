import React, { Component } from 'react'
import styled from 'styled-components'

import {
  FormCard,
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

      </FormCard>
    )
  }
}

export default UserAccountForm