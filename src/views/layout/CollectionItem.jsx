import React, { Component } from 'react'
import styled from 'styled-components'


const ActionItemLink = styled.a`
  margin-left: 10px;
`

const ActionItem = ({ icon, target, color }) => (
  <ActionItemLink href={ target } className={`${color}`}>
    <i className="material-icons">{ icon }</i>
  </ActionItemLink>
)


const ActionItems = ({ actions, color }) => {

  if (Array.isArray(actions)) {
    return actions.map(action => (
      <ActionItem
        color={ color }
        icon={ action.icon }
        key={ action.target + action.icon }
        target={ action.target }
      />
    ))
  }

  return (
    <ActionItem
      color={ color }
      icon={ actions.icon }
      target={ actions.target }
    />
  )
}

const ActionGroup = styled.div`
  float: right;
`

const CollectionItem = ({ title, props, actions, header=false }) => (
  <li className={`collection-${header ? 'header' : 'item'}`}>
    <div>
      {title}
      <ActionGroup>
        <ActionItems
          actions={actions}
          color={'teal-text text-lighten-1'}
        />
      </ActionGroup>
    </div>
  </li>
)

export default CollectionItem