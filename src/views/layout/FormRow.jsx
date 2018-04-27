import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import classNames from "classnames";

const FormRowStyled = styled.div`
  position: relative;
  text-align: ${props => props.align};
`

const FormRow = ({ align, children, className, }) => (
  <FormRowStyled
    align={ align }
    className={ classNames('row', className,) }
  >
    { children }
  </FormRowStyled>
)

FormRow.propTypes = {
  align: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
}

FormRow.defaultProps = {
  align: 'center',
  className: '',
}

export default FormRow