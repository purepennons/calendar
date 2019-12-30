import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { noop, toArray } from 'lodash'

import Node from './Node'
import CalendarWrapper from './CalendarWrapper'

const propTypes = {
  className: PropTypes.string,
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  groupName: PropTypes.string.isRequired,
  title: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.string),
  /** Only pick the first `${columns * rows}` elements. */
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.any.isRequired,
      label: PropTypes.string,
      disabled: PropTypes.bool,
      isActive: PropTypes.bool,
      isMarked: PropTypes.bool,
    })
  ).isRequired,
  onSelect: PropTypes.func,
  onNextClick: PropTypes.func,
  onPrevClick: PropTypes.func,
  onTitleClick: PropTypes.func,
}

const defaultProps = {
  className: '',
  title: '',
  headers: [],
  onSelect: noop,
  onNextClick: noop,
  onPrevClick: noop,
  onTitleClick: noop,
}

const Header = styled.strong`
  font-weight: ${props => props.theme.fonts.weight.bold};
`

function UnStyledBasicView(props) {
  const {
    className,
    columns,
    rows,
    groupName,
    title,
    headers,
    nodes,
    onSelect,
    onPrevClick,
    onNextClick,
    onTitleClick,
  } = props
  const maxNodes = columns * rows
  const onNodeChange = event => {
    onSelect(new Date(event.target.value))
  }

  return (
    <CalendarWrapper
      className={className}
      title={title}
      onPrevClick={onPrevClick}
      onNextClick={onNextClick}
      onTitleClick={onTitleClick}
    >
      <div className="view-container">
        {toArray(headers)
          .slice(0, columns)
          .map((str, idx) => (
            <Header className="view-container__header" key={idx}>
              {str}
            </Header>
          ))}
        {toArray(nodes)
          .slice(0, maxNodes)
          .map(({ id, value, label, disabled, isActive, isMarked }, idx) => (
            <Node
              className="view-container__node"
              name={groupName}
              key={id || idx}
              value={value}
              label={label}
              disabled={disabled}
              isActive={isActive}
              isMarked={isMarked}
              onChange={onNodeChange}
            />
          ))}
      </div>
    </CalendarWrapper>
  )
}

UnStyledBasicView.propTypes = propTypes
UnStyledBasicView.defaultProps = defaultProps

const BasicView = styled(UnStyledBasicView).attrs(props => ({
  nodeWidth: `${100 / props.columns}%`,
}))`
  .view-container {
    display: flex;
    flex-flow: row wrap;
    flex: ${props => `1 0 ${props.nodeWidth}`};
    margin: 20px 10px;

    &__node,
    &__header {
      width: ${props => props.nodeWidth};
      max-width: ${props => props.nodeWidth};
    }

    &__header {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
    }
  }

  @media screen and (max-width: 640px) {
    .view-container {
      ${Node} {
        > span {
          border-radius: 0;
        }
      }
    }
  }
`

BasicView.propTypes = propTypes
BasicView.defaultProps = defaultProps

/** @component */
export default BasicView
