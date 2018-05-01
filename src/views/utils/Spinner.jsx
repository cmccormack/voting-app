import React from 'react'
import PropTypes from 'prop-types'

const SpinnerWrapper = ({size, children, }) => (
  <div className={`preloader-wrapper ${size} active`}>
    { children }
  </div>
)

SpinnerWrapper.propTypes = {
  size: PropTypes.string,
  children: PropTypes.element,
}

SpinnerWrapper.defaultProps = {
  size: 'big',
}

const SpinnerBody = ({color, }) => (
  <div className={`spinner-layer spinner-${color}`}>
    <div className="circle-clipper left">
      <div className="circle"></div>
    </div><div className="gap-patch">
      <div className="circle"></div>
    </div><div className="circle-clipper right">
      <div className="circle"></div>
    </div>
  </div>
)

SpinnerBody.propTypes = {
  color: PropTypes.string,
}

SpinnerBody.defaultProps = {
  color: 'teal',
}

const Spinner = props => (
  <SpinnerWrapper { ...props }>
    <SpinnerBody color="blue" />
    <SpinnerBody color="red" />
    <SpinnerBody color="yellow" />
    <SpinnerBody color="green" />
  </SpinnerWrapper>
)

export default Spinner