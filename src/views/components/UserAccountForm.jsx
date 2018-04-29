import React, { Component, } from 'react'
import styled from 'styled-components'
import { Link, } from 'react-router-dom'
import path from 'path'
import PropTypes from 'prop-types'

import {
  Alert,
  Collection,
  CollectionItem,
  FormCard,
  FormRow,
  Tab,
  TabBody,
  Tabs,
} from '../layout'

const StyledTabs = styled(Tabs)`
  margin-bottom: 40px;
`

const DeleteButton = styled.a.attrs({
  className: "waves-effect red waves-light btn",
})`
  width: 100%;
`

class UserAccountForm extends Component {

  render() {

    const {
      deleteAccount,
      deletePoll,
      error,
      footer,
      loaded,
      location,
      polls,
      title,
      user,
    } = this.props

    const pollsCollection = (
      <Collection>
        {
          polls.map(({ _id: id, title, shortName, }) => (
            <CollectionItem
              actions={[
                {
                  icon: 'delete',
                  target: "#",
                  color: "deep-orange-text text-accent-2",
                  handler: () => deletePoll({ id, title, }),
                },
              ]}
              key={id}
              target={path.join(location.pathname, `polls/${shortName}`)}
              title={{ text: title, color: "teal-text text-darken-1", }}
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
        <FormRow align="left">
          <TabBody id="polls" size="s10 offset-s1">
            { 
              polls.length > 0
              ? pollsCollection
              : pollsEmpty
            }
          </TabBody>
        </FormRow>

        <FormRow align="right">
          <TabBody id="settings" size="s10 m8 l6 offset-s1 offset-m2 offset-l3">
            <DeleteButton
              onClick={ deleteAccount }
            >
              {'Delete My Account'}
            </DeleteButton>
          </TabBody>
        </FormRow>
      </div>
    )

    const loadingPolls = (
      <FormRow align="center">
        <h4 className="teal-text text-darken-1">Loading Polls...</h4>
      </FormRow>
    )

    const alert = (
      <FormRow>
        <Alert
          className="col s8 offset-s2"
          show={error ? true : false}
          type={error ? 'warning' : 'success'}
        >
          <strong>Warning!&nbsp;&nbsp;</strong>{ error }
        </Alert>
      </FormRow>
    )

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m10 offset-m1 xl8 offset-xl2">
            <FormCard
              title={ title }
              footer={ footer }
              error={ error ? true : false }
              alert={ alert }
            >
              <FormRow>
                <StyledTabs
                  color="teal-text darken-2"
                  indicatorColor="#00897b"
                >
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
          </div>
        </div>
      </div>
    )
  }
}

UserAccountForm.propTypes = {
  deleteAccount: PropTypes.func,
  deletePoll: PropTypes.func,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  loaded: PropTypes.bool,
  location: PropTypes.object,
  polls: PropTypes.array,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  user: PropTypes.string,
}

UserAccountForm.defaultProps = {
  error: '',
  footer: '',
  loaded: false,
  location: {},
  polls: [],
  title: 'User Account',
  user: '',
}

export default UserAccountForm