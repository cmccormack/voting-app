import React, { PureComponent, } from 'react'
import { Doughnut, } from 'react-chartjs-2'
import PropTypes from 'prop-types'

class Chart extends PureComponent {

  render() {

    const {
      className,
      choices,
      colors,
    } = this.props

    return (
      <div className={className}>
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
                top: 40,
              },
            },
            responsive: true,
          }}
        />
      </div>
    )
  }
}

Chart.propTypes = {
  className: PropTypes.string,
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
  className: '',
  choices: [],
  colors: [],
}

export default Chart