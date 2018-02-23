import React, { Component } from 'react'
import styled from 'styled-components'
import { VictoryPie, VictoryChart } from 'victory'

import { FormCard, FormRow } from '../layout'
import { IndeterminateProgressBar } from '../utils'


class ViewPollPage extends Component {

  render() {

    const { footer, loaded, poll, error, createdBy } = this.props
    const { title="Poll Not Found.", choices } = poll

    const loadingPoll = (
      <FormCard
        footer={'Please wait while the data is being accessed.'}
        title={'Loading Poll...'}
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
        error={error}
        footer={createdBy && footer}
        title={title}
        user={createdBy}
      >
        <VictoryPie
          data={
            poll.choices && poll.choices.map(({choice, votes}) => {
            return {
              x: choice,
              y: votes ? votes : 1
            }
          })}
          height={250}
          innerRadius={40}
          events={[{
            target: "data",
            eventHandlers: {
              onClick: () => [
                {
                  target: "data",
                  mutation: (props) => {
                    return props.style && props.style.fill === 'red'
                      ? { style: { fill: 'green'}}
                      : { style: { fill: 'red'}}
                  }
                }
              ]
            }
          }]}
        />
      </FormCard>
    )

    return (

      <div className="container">
        <div className="row">
          <div className="col s12 m10 offset-m1 xl8 offset-xl2">
            {!this.props.loaded
              ? loadingPoll
              : body
            }
          </div>
        </div>
      </div>

    )
  }
}

export default ViewPollPage