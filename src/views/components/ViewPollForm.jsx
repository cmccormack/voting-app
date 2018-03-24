import React, { Component } from 'react'
import styled from 'styled-components'

import { Doughnut, defaults } from 'react-chartjs-2'

import { Alert, FormCard, FormRow } from '../layout'
import { IndeterminateProgressBar } from '../utils'

defaults.global.legend.position = 'bottom'
defaults.global.layout.padding.top = 50;

class ViewPollPage extends Component {

  render() {

    const { footer, loaded, poll, error, createdBy } = this.props
    const { title="Poll Not Found.", choices=[] } = poll

    const alert = (
      <FormRow>
        <Alert
          className="col s8 offset-s2"
          show={error ? true : false}
          type={error ? 'warning' : 'success'}
        >
          {error}
        </Alert>
      </FormRow>
    )

    const loadingPoll = (
      <FormCard
        footer={'Please wait while the data is being accessed.'}
        title={'Loading Poll...'}
        alert={ alert }
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
        {/* <VictoryPie
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
        /> */}
        <FormRow>  
          <Doughnut
            data={{
              datasets: [{
                data: choices.map(choice => choice.votes + 1),
                backgroundColor: Array(choices.length)
                  .fill(0)
                  .map(v => `hsl(${Math.floor(Math.random() * 360)}, 50%, 50%)`)
              }],
              labels: choices.map(choice => choice.choice)
            }}
          />
        </FormRow>
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