import React from 'react'
import PropTypes from 'prop-types'

const FormSubmitButton = ({
  buttonText='Submit',
  icon='send',
  onClick,
  position='right',
  size,
}) => (
  <div className={`col ${ size }`}>
    <button
      className={`waves-effect waves-light btn ${position} hoverable`}
      onClick={onClick}
    >
      <i className="material-icons right">{icon}</i>
      {buttonText}
    </button>
  </div>
)

FormSubmitButton.propTypes = {
  buttonText: PropTypes.array,
  icon: PropTypes.array,
  onClick: PropTypes.func,
  position: PropTypes.string,
  size: PropTypes.string,
}

FormSubmitButton.defaultProps = {
  buttonText: 'Submit',
  icon: 'send',
  onClick: () => { },
  position: 'right',
  size: '',
}

export default FormSubmitButton