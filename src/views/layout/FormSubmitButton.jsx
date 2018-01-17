import React, { Component } from 'react'
import styled from 'styled-components'

const FormSubmitButton = ({size, onClick, icon='send', position='right'}) => (
  <div className={`col ${ size }`}>
    <button
      className={`waves-effect waves-light btn ${position} hoverable`}
      onClick={onClick}
    >
      <i className="material-icons right">{icon}</i>
      {'Submit'}
    </button>
  </div>
)

export default FormSubmitButton