import React, { Component } from 'react'

export default ({ size = 's12', color = '', children }) => (
  <div className={`col ${size} ${color}`}>
    {children}
  </div>
)