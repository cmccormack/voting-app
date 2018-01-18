import React, { Component } from 'react'
import styled from 'styled-components'

const InputAction = styled.a.attrs({
  href: "#"
})`
  color: initial;
  position: absolute;
  right: 12px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  line-height: 3;
`

const Icon = styled.i`
  font-size: ${props => props.fontSize};
`


const FormInput = ({
    name,
    icon,
    actionIcon,
    label,
    size = "s12",
    type = "text",
    value = "",
    maxLength = 80,
    disabled,
    ...props
  }) => {

  return (
    <div className={`input-field col ${size}`}>
      { icon && (
          <i className="material-icons prefix">
            {icon}
          </i>
        )
      }
      <InputAction className="action">
        { actionIcon && (
          <Icon 
            className="material-icons"
            fontSize={'18px'}
          >
            { actionIcon }
          </Icon>
        )
      }
      </InputAction>
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
  )
}

export default FormInput