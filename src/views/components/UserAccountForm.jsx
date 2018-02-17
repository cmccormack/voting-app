import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  FormCard,
  FormRow,
  Tabs,
  Tab,
  TabBody,
  Collection,
  CollectionItem
} from '../layout'




const StyledTabs = styled(Tabs)`
  margin-bottom: 40px;
`

class UserAccountForm extends Component {

  render() {

    const { title, footer, error, loaded, polls, user, location } = this.props

    const pollsCollection = (
      <Collection>
        {
          polls.map(({ _id: id, title, shortName }) => (
            <CollectionItem
              actions={[
                { icon: 'edit', target: "#", color: "teal-text text-lighten-2"},
                { icon: 'delete', target: "#", color: "deep-orange-text text-accent-2"}
              ]}
              color="teal-text text-darken-1"
              key={id}
              target={`${location.pathname}/polls/${shortName}`}
              title={title}
            />
          ))
        }
      </Collection>
    )

    const pollsEmpty = (
      <h5 className="center teal-text text-lighten-2">
        {"No Polls Found.  "}
        <Link to={`/user/${user}/new`}>Create a New Poll!</Link>
      </h5>
    )

    const body = (
      <div>
        <FormRow>
          <TabBody id="polls" size="s10 offset-s1">
            { 
              polls.length > 0
              ? pollsCollection
              : pollsEmpty
            }
          </TabBody>
        </FormRow>

        <FormRow className="center">
          <TabBody id="settings" size="s12">
            {'My Settings'}
          </TabBody>
        </FormRow>
      </div>
    )

    const loadingPolls = (
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
          : loadingPolls
        }

      </FormCard>
    )
  }
}

export default UserAccountForm