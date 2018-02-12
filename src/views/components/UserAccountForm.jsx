import React, { Component } from 'react'
import styled from 'styled-components'

import {
  FormCard,
  FormRow,
  Tabs,
  Tab,
  TabBody,
  Collection,
  CollectionItem
} from '../layout'


const MyPolls = (props) => (
  null
)

class UserAccountForm extends Component {

  render() {

    const { title, footer, error } = this.props

    return (
      <FormCard
        title={title}
        footer={footer}
        error={error}
      >
        <FormRow>
          <Tabs color="teal-text darken-2" indicatorColor="#00897b">
            <Tab
              color="teal-text"
              disabled={false}
              disabledColor="teal-text text-lighten-3"
              target="#polls"
              size="s6">
              {'My Polls'}
            </Tab>
            <Tab
              color="teal-text"
              disabled={false}
              disabledColor="teal-text text-lighten-3"
              target="#settings"
              size="s6">
              {'Settings'}
            </Tab>
          </Tabs>
        </FormRow>

        <FormRow>
          <TabBody id="polls" size="s10 offset-s1">
            <Collection>
              <CollectionItem
                action={{ icon: 'send', target: '#' }}
                title="My Polls"
              >
              </CollectionItem>
            </Collection>
          </TabBody>
        </FormRow>
        <TabBody id="settings" className="col s12">My Settings</TabBody>
      </FormCard>
    )
  }
}

export default UserAccountForm