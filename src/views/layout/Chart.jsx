import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2'

const Chart = ({ className, choices, colors, width=300, height=200 }) => {
  
  return (
    <div className={className}>
      <Doughnut
        data={{
          datasets: [{
            data: choices.map(choice => choice.votes),
            backgroundColor: colors,
          }],
          labels: choices.map(choice => choice.choice),
        }}
        options={{
          legend: {
            position: 'bottom',
            padding: 10
          },
          layout: {
            padding: {
              top: 40
            }
          },
          responsive: true,
        }}
      />
    </div>
  )
}

export default Chart