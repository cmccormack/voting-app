import React from "react"
import PropTypes from 'prop-types'
import classNames from 'classnames'


const Footer = ({
  align,
  children,
  colorClass,
}) => (
  <footer className={ classNames( 'page-footer', align, colorClass) }>
    <div className="container">
      <div className="row">
        { children }
      </div>
    </div>
  </footer>
)

Footer.propTypes = {
  align: PropTypes.string,
  children: PropTypes.any,
  colorClass: PropTypes.string,
}

Footer.defaultProps = {
  align: 'center',
  colorClass: '',
}

export default Footer