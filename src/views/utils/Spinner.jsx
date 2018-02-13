import React from 'react'

const SpinnerWrapper = ({size, children}) => (
  <div className={`preloader-wrapper ${size} active`}>
    { children }
  </div>
)

const SpinnerBody = ({color}) => (
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

const Spinner = ({ size='big' }) => (
  <SpinnerWrapper size={ size }>
    <SpinnerBody color="blue" />
    <SpinnerBody color="red" />
    <SpinnerBody color="yellow" />
    <SpinnerBody color="green" />
  </SpinnerWrapper>

)

export default Spinner