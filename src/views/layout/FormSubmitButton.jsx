import React, { Component } from 'react'
import styled from 'styled-components'

const FormSubmitButton = ({onClick, icon='send', position='right'}) => (
  <div className="row">
    <div className="col s6 offset-s3">
      <button
        className={`waves-effect waves-light btn ${position} hoverable`}
        onClick={onClick}
      >
        <i className="material-icons right">{icon}</i>
        {'Submit'}
      </button>
    </div>
  </div>
)

export default FormSubmitButton