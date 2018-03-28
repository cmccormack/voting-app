import React, { Component } from 'react'
import styled from 'styled-components'

const GraphCardWrapper = styled.div`
  margin: 10px auto;
  max-width: 800px;
  height: 100% !important;
`

const GraphCardTitle = ({ title }) => (
  <span className="card-title">
    { title }
  </span>
)

const GraphCardContent = ({ content, children: title }) => (
  <div className="card-content">
    { title }
    { content }
  </div>
)

const GraphCardActionsStyled = styled.div`
  position: relative !important;
`

const GraphCardActions = ({ actions }) => (
  <GraphCardActionsStyled className="card-action">
    { actions }
  </GraphCardActionsStyled>
)

const GraphCard = ({ title, content, actions}) => (
  <GraphCardWrapper className="card large hoverable">
    <GraphCardContent content={content}>
      <GraphCardTitle title={title} />
    </GraphCardContent>
    <GraphCardActions actions={actions} />
  </GraphCardWrapper>
)

export default GraphCard