import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ActionItemLink = styled.a`
  margin-left: 10px;
`

const ActionItem = ({ icon, target, color }) => (
  <ActionItemLink href={ target } className={`${color}`}>
    <i className="material-icons">{ icon }</i>
  </ActionItemLink>
)


const ActionItems = ({ actions }) => (
  actions.map(({ icon, target, color }) => (
    <ActionItem
      color={ color }
      icon={ icon }
      key={ target + icon }
      target={ target }
    />
  ))
)


const ActionGroup = styled.div`
  float: right;
`

const CollectionItem = ({
  color,
  target,
  title,
  props,
  actions,
  header=false
}) => (
  <li className={`collection-${header ? 'header' : 'item'}`}>
    <div>
      { target
        ? <Link className={ color } to={target}>{title}</Link>
        : <span className={ color }>{title}</span>
      }
      <ActionGroup>
        <ActionItems
          actions={ Array.isArray(actions) ? actions : [ actions ] }
        />
      </ActionGroup>
    </div>
  </li>
)

export default CollectionItem