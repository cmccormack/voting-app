import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { FormInput, } from './'

const StyledChoiceLabel = styled.label`
  right: 0;
  top: 0;
  bottom: 0;
`

const StyledChoice = styled.div`
  position: relative;
  margin-top: 1rem;

  label {
    left: .75rem;
    top: 0;
    transform-origin: 0% 100%;
    text-align: initial;
    transform: translateY(12px);
  }
`

const PollChoice = ({
  action,
  choice,
  onChange,
  index,
  selectedChoiceIndex,
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
        <StyledChoice className="col s2 right-align">
          <input
            checked={index === selectedChoiceIndex}
            className='with-gap'
            type='radio'
            name='choices'
            id={`choice_${index}`}
            onChange={handleSelectedChoice}
          
            value={index}
          />
          <StyledChoiceLabel htmlFor={`choice_${index}`}></StyledChoiceLabel>
        </StyledChoice>
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

PollChoice.propTypes = {
  action: PropTypes.func,
  choice: PropTypes.string,
  handleSelectedChoice: PropTypes.func,
  onChange: PropTypes.func,
  index: PropTypes.number.isRequired,
  selectedChoiceIndex: PropTypes.number.isRequired,
}

PollChoice.defaultProps = {
  choice: '',
}

export default PollChoice