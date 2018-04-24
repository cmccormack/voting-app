import React from 'react'
import styled from 'styled-components'
import { Link, } from 'react-router-dom'
import PropTypes from 'prop-types'

const ActionItemLink = styled.a`
  margin-left: 10px;
  cursor: pointer;
`

const ActionItem = ({ icon, color, handler, }) => (
  <ActionItemLink className={`${color}`}>
    <i
      className="material-icons"
      onClick={ handler }
    >
      { icon }
    </i>
  </ActionItemLink>
)

ActionItem.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  handler: PropTypes.func,
}


const ActionItems = ({ actions, }) => (
  actions.map(({ icon, target, color, handler, }) => (
    <ActionItem
      color={ color }
      handler={ handler }
      icon={ icon }
      key={ target + icon }
      target={ target }
    />
  ))
)


const ActionGroup = styled.div`
  float: right;
`

const CollectionItem = ({
  actions,
  children,
  className,
  header,
  target,
  title: { color, text, },
}) => (
  <li className={`${className} collection-${header ? 'header' : 'item'}`}>
    <div>
      { 
        text && (
          target
          ? <Link className={ color } to={target}>{text}</Link>
          : <span className={ color }>{text}</span>
        )
      }
      { children }
      {
        actions  &&
        <ActionGroup>
          <ActionItems
            actions={ Array.isArray(actions) ? actions : [ actions, ] }
          />
        </ActionGroup>
      }
    </div>
  </li>
)

CollectionItem.propTypes = {
  actions: PropTypes.array,
  children: PropTypes.any,
  className: PropTypes.string,
  header: PropTypes.bool,
  target: PropTypes.string,
  title: PropTypes.shape({
    color: PropTypes.string,
    text: PropTypes.string,
  }),
}

CollectionItem.defaultProps = {
  action: [],
  className: '',
  header: false,
  target: '',
  title: { color: '', text: '', },
}

export default CollectionItem