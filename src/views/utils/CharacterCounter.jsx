import React from 'react'
import styled from 'styled-components'

const getPositionOrDefault = value => value == undefined ? 'unset' : value

const CharacterCounterStyled = styled.span`
  color: ${props => props.color};
  display: ${props => props.isVisible ? 'block' : 'none'};
  position: absolute;
  top: ${props => getPositionOrDefault(props.top)};
  right: ${props => getPositionOrDefault(props.right)};
  bottom: ${props => getPositionOrDefault(props.bottom)};
  left: ${props => getPositionOrDefault(props.left)};
  line-height: ${props => props.lineHeight || 'normal'};
`

const CharacterCounter = ({ count, max, ...props }) => (
  <CharacterCounterStyled
    color={ count > max * .8 ? 'red' : count > max * .5 ? 'orange' : 'green' }
    isVisible={ count > max * .5 }
    { ...props }
  >
    { count }
  </CharacterCounterStyled>
)

export default CharacterCounter