import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Icon, } from './'
import { CharacterCounter, } from '../utils'

const InputAction = styled.a.attrs({
  href: "#",
  tabIndex: -1,
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
    actionIcon,
    label,
    onBlur,
    onChange,
    onFocus,
    size,
    type,
    value,
    maxLength,
    disabled,
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
        onChange={ onChange }
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

FormInput.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  index: PropTypes.number,
  action: PropTypes.func,
  actionIcon: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  size: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
}

FormInput.defaultProps = {
  name: '',
  icon: '',
  action: null,
  actionIcon: "close",
  index: 0,
  label: null,
  onBlur: null,
  onChange: null,
  onFocus: null,
  size: "s12",
  type: "text",
  value: "",
  maxLength: 80,
  disabled: false,
}

export default FormInput