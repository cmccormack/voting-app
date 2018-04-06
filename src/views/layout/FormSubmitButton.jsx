import React, { Component } from 'react'
import styled from 'styled-components'

const FormSubmitButton = ({
  buttonText='Submit',
  icon='send',
  onClick,
  position='right',
  size,
}) => (
  <div className={`col ${ size }`}>
    <button
      className={`waves-effect waves-light btn ${position} hoverable`}
      onClick={onClick}
    >
      <i className="material-icons right">{icon}</i>
      {buttonText}
    </button>
  </div>
)

export default FormSubmitButton