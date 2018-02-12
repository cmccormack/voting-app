import React, { Component } from 'react'
import styled from 'styled-components'

const CollectionItem = ({ title, props, action, header=false }) => (
  <li className={`collection-${header ? 'header' : 'item'}`}>
    <div>
      {title}
      <a href={ action.target } className="secondary-content">
        <i className="material-icons">{ action.icon }</i>
      </a>
    </div>
  </li>
)

export default CollectionItem