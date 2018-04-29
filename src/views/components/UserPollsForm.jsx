import React, { Component, } from 'react'
import styled from 'styled-components'
import { Link, } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Alert,
  Chart,
  Col,
  FormCard,
  FormRow,
  GraphCard,
} from '../layout'
import { IndeterminateProgressBar, } from '../utils'

import LoaderWithTimeout from '../utils/LoaderWithTimeout'

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
      apiTimeout,
      error,
      footer,
      loading,
      polls,
      title,
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
        title={'Error Loading Polls From Server.'}
      />
    )

    const loadingPolls = (
      <FormCard
        alert={ alert }
        footer={'Please wait while the data is being accessed.'}
        title={'Loading Polls...'}
      >
        <FormRow>
          <Col size="s8 offset-s2">
            <IndeterminateProgressBar />
          </Col>
        </FormRow>
      </FormCard>
    )



    const body = (
      <FormCard
        error={ error ? true : false }
        footer={ user && footer }
        title={ title }
        user={ user }
        alert={ alert }
      >
        { polls.length > 0 &&
          <ChoicesSection>
            <FormRow>
              <ChoicesTitle 
                className='col s10 offset-s1 teal-text text-darken-1'
              >
                {"Select a poll below!"}
              </ChoicesTitle>
            </FormRow>
            <FormRow>
              { polls.map(
                ({ title, shortName, ...poll }) => {
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
                            choices={ poll.choices }
                            colors={ poll.choiceColors }
                          />
                        }
                        actions={ null }
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
        <FormRow>
          <Col size="s12 m10 offset-m1 xl8 offset-xl2">
            <LoaderWithTimeout
              loaded={ !loading }
              renderSuccess={ body }
              renderFailed={ loadingPollsFailedCard }
              renderLoading={ loadingPolls }
              timeout={ apiTimeout }
            />
          </Col>
        </FormRow>
      </div>

    )
  }
}

UserPollsForm.propTypes = {
  apiTimeout: PropTypes.number,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  loading: PropTypes.bool,
  polls: PropTypes.array,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  user: PropTypes.string,
}

UserPollsForm.defaultProps = {
  apiTimeout: 0,
  error: '',
  footer: '',
  loading: true,
  polls: [],
  title: '',
  user: '',
}

export default UserPollsForm