import React, { Component } from 'react'
import styled from 'styled-components'

const Collection = ({ children }) => (
  <ul className="collection with-header">
    { children }
  </ul>
)

export default Collection