import React, { Component } from 'react'

const GraphCardTitle = ({ title }) => (
  <span className="card-title">
    { title }
  </span>
)

const GraphCardContent = ({ content, children: title }) => (
  <div className="card-content">
    <div>
      { title }
      { content }
    </div>
  </div>
)

const GraphCardActions = ({ actions }) => (
  <div className="card-action">
    { actions }
  </div>
)

const GraphCard = ({ title, content, actions}) => (
  <div className="card large hoverable">
    <GraphCardContent content={content}>
      <GraphCardTitle title={title} />
    </GraphCardContent>
    <GraphCardActions actions={actions} />
  </div>
)

export default GraphCard