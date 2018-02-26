import React, { Component } from 'react'
import styled from 'styled-components'
import { VictoryPie, VictoryChart, VictoryTheme, VictoryTooltip } from 'victory'

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
          // labelComponent={<VictoryTooltip />}
          data={
            poll.choices && poll.choices.map(({choice, votes}) => {
            return {
              x: choice,
              y: votes + 1,
              label: choice
            }
          })}
          height={250}
          innerRadius={40}
          padAngle={3}
          theme={VictoryTheme.material}
          style={{
            data: {
              fill: (props) => {
                props.color = Math.floor(Math.random() * 360)
                return `hsl(${props.color}, 60%, 60%)`
              }
            }
          }}
          // events={
          //   [
          //     {
          //       target: "data",
          //       eventHandlers: {
          //         onMouseOver: (props) => {
          //           console.log(props)
          //         }
          //       }
          //     }
          //   ]
          // }
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