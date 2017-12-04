import React, { Component } from 'react'

const Alert = (props) => {
  const { success, title, message } = props

  return (
    <div className={`alert ${success}`}>
      <strong>{title}</strong>{message}
    </div>
  )
}

export default Alert