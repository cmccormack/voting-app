import React, { Component } from 'react'
import styled from 'styled-components'

import { Icon } from './'
import { CharacterCounter } from '../utils'

const InputAction = styled.a.attrs({
  href: "#",
  tabIndex: -1
})`
  color: initial;
  position: absolute;
  right: 12px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  line-height: 3;
`

const FormInput = ({
    name,
    icon,
    index,
    action,
    actionIcon="close",
    label,
    onBlur=()=>{},
    onFocus=()=>{},
    size = "s12",
    type = "text",
    value = "",
    maxLength = 80,
    disabled,
    ...props
  }) => {

  return (
    <div className={`input-field col ${ size }`}>
      <CharacterCounter
        count={ value.length }
        max={ maxLength }
        right={ '-10px' }
        lineHeight={ 4 }
      />
      { icon && (
          <i className="material-icons prefix">
            { icon }
          </i>
      ) }
      { action && (
        <InputAction
          id={`${ name }_action`}
          data-index={ index }
          onClick={ action }
        >
          <Icon 
            className="material-icons"
            fontSize="18px"
          >
            { actionIcon }
          </Icon>
        </InputAction>
      )}
      <input
        className="validate"
        disabled={ disabled }
        id={`input_${ name}` }
        maxLength={ maxLength }
        name={ name }
        onBlur={ onBlur }
        onChange={ props.onChange }
        onFocus={ onFocus }
        type={ type }
        value={ value }
      />
      { label && 
        ( 
          <label 
            className={ value ? 'active' : '' }
            htmlFor={ name }
          >
            { label }
          </label> 
        )
      }
    </div>
  )
}

export default FormInput