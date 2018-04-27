import React, { PureComponent, } from 'react'
import { Doughnut, } from 'react-chartjs-2'
import PropTypes from 'prop-types'

class Chart extends PureComponent {

  render() {

    const {
      choices,
      colors,
    } = this.props

    return (
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
            maintainAspectRatio: true,
          }}
        />
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