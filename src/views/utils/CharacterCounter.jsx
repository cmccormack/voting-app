import React from 'react'
import styled from 'styled-components'


const CharacterCounterStyled = styled.span`
  color: ${props => props.color};
  display: ${props => props.isVisible ? 'block' : 'none'};
  position: absolute;
  top: ${props => props.top || 'unset'};
  /* was -10 */
  right: ${props => props.right || 'unset'};
  bottom: ${props => props.bottom || 'unset'};
  left: ${props => props.left || 'unset'};
  /* was 4 */
  line-height: ${props => props.lineHeight || 'normal'};
`

const CharacterCounter = ({ count, max, ...props }) => (
  <CharacterCounterStyled
    color={count > max * .8 ? 'red' : count > max * .5 ? 'orange' : 'green'}
    isVisible={count > max * .5}
    { ...props }
  >
    {console.log(count)}
    { count }
  </CharacterCounterStyled>
)

export default CharacterCounter