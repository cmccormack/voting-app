import React, { Component } from 'react'
import styled from 'styled-components'

const FormInput = props => {

  return (
    <div className="row">
      <div className={`input-field col ${props.size}`}>
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
          maxLength={props.maxLength || 80}
        />
        { props.label && 
          ( <label htmlFor={props.name}>{props.label}</label> )
        }
      </div>
    </div>
  )
}

export default FormInput