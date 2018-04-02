import React, { Component } from 'react'
import styled from 'styled-components'

const Collection = ({ children, className }) => (
  <ul className={`${className} collection with-header`}>
    { children }
  </ul>
)

export default Collection