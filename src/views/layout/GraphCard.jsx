import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import classNames from 'classnames'

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
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
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
  <GraphCardActionsStyled
    className={ classNames(
      { "card-action": actions, },
    )}
  >
    { actions }
  </GraphCardActionsStyled>
)

GraphCardActions.propTypes = {
  actions: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.element,
  ]),
}

GraphCardActions.defaultProps = {
  actions: null,
}


const GraphCard = ({ hoverable, ...props }) => (
  <GraphCardWrapper className={ classNames(
    "card large",
    {'hoverable': hoverable, }
  )}>
    <GraphCardContent { ...props }>
      <GraphCardTitle { ...props } />
    </GraphCardContent>
    <GraphCardActions { ...props } />
  </GraphCardWrapper>
)

GraphCard.propTypes = {
  hoverable: PropTypes.bool,
}

GraphCard.defaultProps = {
  hoverable: true,
}

export default GraphCard