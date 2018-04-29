import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import FormRow from './FormRow'

const FormCardMain = styled.div.attrs({
  className: "card z-depth-4",
}) `
  margin-top: 80px;
`

const FormCardTitle = styled.div.attrs({
  className: "teal-text text-darken-1 center",
}) `
  font-size: 2.4rem !important;
  font-weight: 300;
  line-height: 32px;
  margin: 20px 0 20px;
  text-transform: capitalize;
`

const FormBody = styled.div`
  margin: 0 0 60px;
  transform: translateY(${props => props.slide ? '0px' : '-50px'});
  transition: transform .2s linear;
`

const FormCard = ({
  title,
  footer,
  error,
  children,
  alert,
}) => {

  return (
    <FormCardMain>
      <div className="card-content">

        <div className="row">
          <FormCardTitle>
            { title }
          </FormCardTitle>
        </div>

        {/* { alert || <FormRow /> } */}
        <FormRow>
          { alert }
        </FormRow>

        <FormBody slide={ error ? true : false }>
          { children }
        </FormBody>

        <div className="row">
          <div className="col-xs-12 center">
            {footer}
          </div>
        </div>
        
      </div>
    </FormCardMain>
  )
}

FormCard.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  error: PropTypes.bool,
  children: PropTypes.any,
  alert: PropTypes.element,
}

export default FormCard