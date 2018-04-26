import styled, {keyframes, } from 'styled-components'
import PropTypes from 'prop-types'

const fadeIn = keyframes`
  0% {
    opacity: 0
    transform: scale(.75)
  }
  50% {
    transform: scale(1.25)
  }
  100% {
    opacity: 1
    transform: scale(1)
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1
    transform: scale(1)
  }
  100% {
    opacity: 0
    transform: scale(.25)
  }
`

const theme = {
  'primary': { bgColor: '#cce5ff', bgHover: '#bbd4ee', borderColor: '#b8daff', fontColor: '#004085', },
  'secondary': { bgColor: '#e2e3e5', bgHover: '#d1d2d4', borderColor: '#d6d8db', fontColor: '#383d41', },
  'success': { bgColor: '#d4edda', bgHover: '#c3edc6', borderColor: '#c3e6cb', fontColor: '#155724', },
  'danger': { bgColor: '#f8d7da', bgHover: '#f8c6c9', borderColor: '#f5c6cb', fontColor: '#721c24', },
  'warning': { bgColor: '#fff3cd', bgHover: '#f8eac1', borderColor: '#ffeeba', fontColor: '#856404', },
  'info': { bgColor: '#d1ecf1', bgHover: '#cbe7ec', borderColor: '#bee5eb', fontColor: '#0c5460', },
  'light': { bgColor: '#fefefe', bgHover: '#f9f9f9', borderColor: '#fdfdfe', fontColor: '#818182', },
  'dark': { bgColor: '#d6d8d9', bgHover: '#d1d3d4', borderColor: '#c6c8ca', fontColor: '#1b1e21', },
}

const Alert = styled.div`
  text-align: center;
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  border-radius: .25rem;
  padding: .75rem 1.25rem !important;
  border: 1px solid transparent;
  animation: .5s ${props => props.show ? fadeIn : fadeOut} ease-out;
  color: ${({type,}) => theme[type].fontColor};
  background-color: ${({type,}) => theme[type].bgColor};
  border-color: ${({type,}) => theme[type].borderColor};

  :hover {
    background-color: ${({type, hoverable,}) => hoverable
      ? theme[type].bgHover
      : theme[type].bgColor
    };
  }
`

Alert.propTypes = {
  type: PropTypes.string,
  hoverable: PropTypes.bool,
}

Alert.defaultProps = {
  type: 'warning',
  hoverable: false,
}

export default Alert