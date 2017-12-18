import React, { Component } from 'react'
import styled from 'styled-components'

const FormInput = props => (
  <div className="row">
    <div className="input-field col s12 m12 l8 offset-l2">
      { props.icon && (
          <i className="material-icons prefix">
            {props.icon}
          </i>
        )
      }
      <input
        className="validate"
        id={`input_${props.name}`}
        name={props.name}
        onChange={props.onChange}
        required={props.required}
        type={props.type || 'text'}
        value={props.value || ''}
      />
      { props.label && 
        ( <label htmlFor={props.name}>{props.label}</label> )
      }
    </div>
  </div>
)

export default FormInput