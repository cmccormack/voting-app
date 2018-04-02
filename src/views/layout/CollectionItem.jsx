import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ActionItemLink = styled.a`
  margin-left: 10px;
  cursor: pointer;
`

const ActionItem = ({ icon, target, color, handler }) => (
  <ActionItemLink className={`${color}`}>
    <i className="material-icons" onClick={ handler }>{ icon }</i>
  </ActionItemLink>
)


const ActionItems = ({ actions }) => (
  actions.map(({ icon, target, color, handler }) => (
    <ActionItem
      color={ color }
      handler={ handler }
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
  className,
  target,
  title: { title='', color=''},
  props,
  actions,
  header=false
}) => (
  <li className={`${className} collection-${header ? 'header' : 'item'}`}>
    <div>
      { 
        title && (
          target
          ? <Link className={ color } to={target}>{title}</Link>
          : <span className={ color }>{title}</span>
        )
      }
      { actions  &&
        <ActionGroup>
          <ActionItems
            actions={ Array.isArray(actions) ? actions : [ actions ] }
          />
        </ActionGroup>
      }
    </div>
  </li>
)

export default CollectionItem