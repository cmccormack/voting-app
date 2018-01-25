import React, { Component } from 'react'
import styled from 'styled-components'

import { WarningAlert } from './Alerts'

const FormCardMain = styled.div.attrs({
  className: "card z-depth-4 hoverable"
}) `
  margin-top: 80px;
`

const FormCardTitle = styled.div.attrs({
  className: "teal-text text-darken-1 center"
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

const FormCard = ({title, footer, error, children}) => {

  return (
    <FormCardMain>
      <div className="card-content">

        <div className="row">
          <FormCardTitle>
            {title}
          </FormCardTitle>
        </div>

        <div className="row">
          <WarningAlert
            className="col s8 offset-s2"
            show={error ? true : false}
          >
            <strong>Warning!&nbsp;&nbsp;</strong>{error}
          </WarningAlert>
        </div>

        <FormBody slide={error ? true : false}>
          { children }
        </FormBody>

        <div className="row center">
          {footer}
        </div>
        
      </div>
    </FormCardMain>
  )
}

export default FormCard