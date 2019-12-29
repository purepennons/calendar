import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { format } from 'date-fns'
import { noop, last, first } from 'lodash'

import constants from '../../constants/'
import BasicView from './BasicView'
import Node from './Node'

const NODE_WIDTH = constants.DATE_COLUMNS * constants.MONTH_COLUMNS * 2
const NODE_HEIGHT = NODE_WIDTH

const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
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
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
  onTitleClick: PropTypes.func,
}

const defaultProps = {
  className: '',
  name: '',
  onSelect: noop,
  onPrev: noop,
  onNext: noop,
  onTitleClick: noop,
}

function getTitle(nodes) {
  const activedNodes = nodes.filter(node => !node.disabled)
  if (activedNodes.length < 2) {
    return ''
  }

  return `${format(first(activedNodes).value, 'yyyy')}-${format(
    last(activedNodes).value,
    'yyyy'
  )}`
}

function UnStyledYearView(props) {
  const {
    className,
    name,
    nodes,
    onSelect,
    onPrev,
    onNext,
    onTitleClick,
  } = props
  return (
    <BasicView
      title={getTitle(nodes)}
      groupName={`month-view-${name}`}
      className={className}
      columns={constants.YEAR_COLUMNS}
      rows={constants.YEAR_ROWS}
      nodes={nodes}
      onSelect={onSelect}
      onPrevClick={onPrev}
      onNextClick={onNext}
      onTitleClick={onTitleClick}
    />
  )
}

UnStyledYearView.propTypes = propTypes
UnStyledYearView.defaultProps = defaultProps

const YearView = styled(UnStyledYearView)`
  ${Node} {
    > span {
      width: ${`${NODE_WIDTH}px`};
      height: ${`${NODE_HEIGHT}px`};
    }
  }
`

YearView.propTypes = propTypes
YearView.defaultProps = defaultProps

/** @component */
export default YearView
