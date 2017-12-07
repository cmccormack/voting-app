import React, { Component } from 'react'
import styled from 'styled-components'

const FormCardMain = styled.div.attrs({
  className: "card z-depth-4"
}) `
  margin-top: 100px;
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

const FormErrorMessage = styled.div.attrs({
  className: "center amber lighten-2 col s8 offset-s2"
}) `
  display: visible;
  border-radius: 5px;
`

const FormBody = styled.div`
  margin: 0 0 60px;
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
          <FormErrorMessage>
            {'Placeholder error message'}
          </FormErrorMessage>
        </div>

        <FormBody>
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