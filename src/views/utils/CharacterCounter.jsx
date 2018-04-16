import React, { Component } from 'react'
import styled from 'styled-components'

const CharacterCounterStyled = styled.span`
  color: ${props => props.color || props.theme.color};
  display: ${props => (props.isVisible || props.theme.isVisible) 
    ? 'block' 
    : 'none'
  };
  position: absolute;
  top: ${props => props.top || props.theme.top};
  right: ${props => props.right || props.theme.right};
  bottom: ${props => props.bottom || props.theme.bottom};
  left: ${props => props.left || props.theme.left};
  line-height: ${props => props.lineHeight || props.theme.lineHeight};
`

class CharacterCounter extends Component {

  render() {

    const { count, max, ...props } = this.props

    return(
      <CharacterCounterStyled
        color={ count > max * .8 ? 'red' : count > max * .5 ? 'orange' : 'green' }
        isVisible={ count > max * .5 }
        { ...props }
      >
        { count }
      </CharacterCounterStyled>

    )

  }
}

CharacterCounter.defaultProps = {
  theme: {
    top: 0,
    right: 'unset',
    bottom: 0,
    left: 'unset',
    color: 'initial',
    lineHeight: 'normal',
    isVisible: false
  }
}

export default CharacterCounter