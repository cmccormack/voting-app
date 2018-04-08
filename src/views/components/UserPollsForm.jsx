import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import {
  Alert,
  Chart,
  Col,
  FormCard,
  FormRow,
  GraphCard,
  Row,
} from '../layout'
import { IndeterminateProgressBar } from '../utils'

const ChoicesTitle = styled.div`
  text-align: center;
  font-size: 1.6rem;
  text-transform: capitalize;
`

const ChoicesSection = styled.div`
  margin-top: 40px;
`


class UserPollsForm extends Component {

  render() {

    const {
      error,
      footer,
      handleChoiceSelect,
      handleSubmit,
      loaded,
      loadingFailed,
      polls,
      title,
      selectedChoice,
      user,
    } = this.props

    const alert = (
      <FormRow>
        <Alert
          className="col s8 offset-s2"
          show={error ? true : false}
          type={error ? 'warning' : 'success'}
        >
          { error }
        </Alert>
      </FormRow>
    )

    const loadingPollsFailedCard = (
      <FormCard
        alert={alert}
        footer={'Please try again later'}
        title={'Error Loading Polls From Server'}
      >
        {/* <FormRow>
          <div className="col s8 offset-s2">
            <IndeterminateProgressBar />
          </div>
        </FormRow> */}
      </FormCard>
    )

    const loadingPolls = (
      <FormCard
        alert={ alert }
        footer={'Please wait while the data is being accessed.'}
        title={'Loading Polls...'}
      >
        <FormRow>
          <div className="col s8 offset-s2">
            <IndeterminateProgressBar />
          </div>
        </FormRow>
      </FormCard>
    )



    const body = (
      <FormCard
        error={ error }
        footer={ user && footer }
        title={ title }
        user={ user }
        alert={ alert }
      >
        {/* <FormRow>
          <Chart
            choices={ choices }
            className="col s12 m10 offset-m1"
            colors={choiceColors}
          />
        </FormRow> */}

        { polls.length > 0 &&
          <ChoicesSection>
            <FormRow>
              <ChoicesTitle 
                className='col s10 offset-s1 teal-text text-darken-1'
              >
                Select a poll below and vote!
              </ChoicesTitle>
              { polls.map(
                ({ title, shortName, ...poll }) => {
                  console.log(`user/${user}/polls/${shortName}`)
                  return (
                    <Col size="s12 xl10 offset-xl1" key={`${user}-${shortName}`}>
                      <GraphCard
                        title={
                          <Link to={`polls/${shortName}`}>
                            {title}
                          </Link>
                        }
                        content={
                          <Chart
                            choices={poll.choices}
                            colors={poll.choiceColors}
                          />
                        }
                        actions={`Created by ${user}`}
                      />
                    </Col>
                  )
                })
              }
            </FormRow>
          </ChoicesSection>
        }
      </FormCard>
    )

    return (

      <div className="container center">
        <div className="row">
          <div className="col s12 m10 offset-m1 xl8 offset-xl2">
            { 
              !loaded
              ? loadingPolls
              : this.props.loadingFailed
                ? loadingPollsFailedCard
                : body
            }
          </div>
        </div>
      </div>

    )
  }
}

export default UserPollsForm