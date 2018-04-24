import React, { Component, } from 'react'
import styled from 'styled-components'

import { FormInput, } from './'

const StyledChoiceLabel = styled.label`
  right: 0;
  top: 0;
  bottom: 0;
`

export default ({
  action,
  choice = '',
  onChange,
  index = -1,
  selectedChoice = 0,
  ...props
}) => {

  const handleAction = e => {
    action(e, index)
  }

  const handleSelectedChoice = () => {
    props.handleSelectedChoice(index)
  }

  const handleInputChange = e => {
    index === -1 ? onChange(e) : onChange(e, e.target.value, index)
  }

  return (
    <div>
      {index >= 0 &&
        <div className="col s2 right-align">
          <input
            checked={index === selectedChoice}
            className='with-gap'
            type='radio'
            name='choices'
            id={`choice_${index}`}
            onChange={handleSelectedChoice}
            value={index}
          />
          <StyledChoiceLabel htmlFor={`choice_${index}`}></StyledChoiceLabel>
        </div>
      }
      <FormInput
        action={action && handleAction}
        index={index}
        onChange={handleInputChange}
        size="s8"
        value={choice}
        {...props}
      />
    </div>
  )
}