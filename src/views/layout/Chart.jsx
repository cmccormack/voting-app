import React, { PureComponent, } from 'react'
import { Doughnut, } from 'react-chartjs-2'
import styled from 'styled-components'
import PropTypes from 'prop-types'


const DoughnutWrapperStyled = styled.div`
  height: 300px;
`

class Chart extends PureComponent {

  render() {

    const {
      choices,
      colors,
    } = this.props

    return (
      <DoughnutWrapperStyled>
        <Doughnut
          data={{
            datasets: [{
              data: choices.map(choice => choice.votes),
              backgroundColor: colors,
            },],
            labels: choices.map(choice => choice.choice),
          }}
          options={{
            legend: {
              position: 'bottom',
              padding: 10,
            },
            layout: {
              padding: {
                top: 10,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </DoughnutWrapperStyled>
    )
  }
}

Chart.propTypes = {
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      choice: PropTypes.string,
      votes: PropTypes.number,
    })
  ),
  colors: PropTypes.arrayOf(PropTypes.string),
}

Chart.defaultProps = {
  choices: [],
  colors: [],
}

export default Chart