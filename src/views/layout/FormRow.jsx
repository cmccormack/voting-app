import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import classNames from "classnames";

const FormRowStyled = styled.div`
  position: relative;
`

const FormRow = ({ align="", children, className="", }) => (
  <FormRowStyled className={ classNames('row', align, className,) }>
    { children }
  </FormRowStyled>
)

FormRow.propTypes = {
  align: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
}

FormRow.defaultProps = {
  align: 'left',
  className: '',
}

export default FormRow