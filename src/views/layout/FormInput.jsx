import React, { Component } from 'react'
import styled from 'styled-components'

const FormInput = ({
    name,
    icon,
    label,
    size = "s12",
    type = "text",
    value = "",
    maxLength = 80,
    disabled,
    ...props
  }) => {

  return (
    <div className="row">
      <div className={`input-field col ${size}`}>
        { icon && (
            <i className="material-icons prefix">
              {icon}
            </i>
          )
        }
        <input
          className="validate"
          disabled={disabled}
          id={`input_${name}`}
          maxLength={maxLength}
          name={name}
          onChange={props.onChange}
          type={type}
          value={value}
        />
        { label && 
          ( <label htmlFor={name}>{label}</label> )
        }
      </div>
    </div>
  )
}

export default FormInput