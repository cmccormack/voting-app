import React, { Component } from 'react'
import styled from 'styled-components'

import { Icon } from './'

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

const CharacterCountStyled = styled.span`
  color: ${props => props.color};
  display: ${props => props.isVisible ? 'block' : 'none'};
  position: absolute;
  right: -10px;
  line-height: 4;
`

const CharacterCount = ({ count, max }) => (
  <CharacterCountStyled
    color={count > max * .8 ? 'red' : count > max * .5 ? 'orange' : 'green'}
    isVisible={count > max * .5}
  >
    {count}
  </CharacterCountStyled>
)

const FormInput = ({
    name,
    icon,
    index,
    action,
    actionIcon="close",
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
      <CharacterCount
        count={value.length}
        max={maxLength}
      />
      { icon && (
          <i className="material-icons prefix">
            {icon}
          </i>
      )}
      { action && (
        <InputAction
          id={`${name}_action`}
          data-index={index}
          onClick={action}
        >
          <Icon 
            className="material-icons"
            fontSize={'18px'}
          >
            { actionIcon }
          </Icon>
        </InputAction>
      )}
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
        ( 
          <label 
            className={ value ? 'active' : '' }
            htmlFor={name}
          >
            {label}
          </label> 
        )
      }
    </div>
  )
}

export default FormInput