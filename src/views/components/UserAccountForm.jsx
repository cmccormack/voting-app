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
  console.log('')
)

const StyledTabs = styled(Tabs)`
  margin-bottom: 40px;
`

class UserAccountForm extends Component {

  render() {

    const { title, footer, error, loaded } = this.props

    const body = (
      <div>
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

        <FormRow className="center">
          <TabBody id="settings" size="s12">
            {'My Settings'}
          </TabBody>
        </FormRow>
      </div>
    )

    const loading = (
      <FormRow align="center">
        <h4 className="teal-text text-darken-1">Loading Polls...</h4>
      </FormRow>
    )

    return (
      <FormCard
        title={title}
        footer={footer}
        error={error}
      >
        <FormRow>
          <StyledTabs color="teal-text darken-2" indicatorColor="#00897b">
            <Tab
              color="teal-text"
              disabledColor="teal-text text-lighten-3"
              target="#polls"
              size="s6"
            >
              {'My Polls'}
            </Tab>
            <Tab
              color="teal-text"
              disabledColor="teal-text text-lighten-3"
              target="#settings"
              size="s6"
            >
              {'Settings'}
            </Tab>
          </StyledTabs>
        </FormRow>

        { loaded 
          ? body 
          : loading
        }

      </FormCard>
    )
  }
}

export default UserAccountForm