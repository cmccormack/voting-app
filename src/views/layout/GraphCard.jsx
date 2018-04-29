import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const GraphCardWrapper = styled.div`
  margin: 10px auto;
  max-width: 800px;
  height: 100% !important;
`

const GraphCardTitle = ({ title, }) => (
  <span className="card-title">
    { title }
  </span>
)

GraphCardTitle.propTypes = {
  title: PropTypes.string,
}

GraphCardTitle.defaultProps = {
  title: 'Title',
}


const GraphCardContent = ({ content, children: title, }) => (
  <div className="card-content">
    { title }
    { content }
  </div>
)

GraphCardContent.propTypes = {
  content: PropTypes.any,
  children: PropTypes.any,
}


const GraphCardActionsStyled = styled.div`
  position: relative !important;
  color: none !important;
  text-transform: none !important;
`


const GraphCardActions = ({ actions, }) => (
  <GraphCardActionsStyled className="card-action">
    { actions }
  </GraphCardActionsStyled>
)

GraphCardActions.propTypes = {
  actions: PropTypes.array,
}

GraphCardActions.defaultProps = {
  actions: [],
}


const GraphCard = ({ actions, ...props }) => (
  <GraphCardWrapper className="card large hoverable">
    <GraphCardContent { ...props }>
      <GraphCardTitle { ...props } />
    </GraphCardContent>
    { actions && <GraphCardActions actions={actions} /> }
  </GraphCardWrapper>
)

GraphCard.propTypes = {
  actions: PropTypes.array,
}

GraphCard.defaultProps = {
  actions: [],
}

export default GraphCard