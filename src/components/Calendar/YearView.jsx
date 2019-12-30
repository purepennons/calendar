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
  /** A postfix name for the `<Node>` name. */
  name: PropTypes.string,
  /** Current date. */
  date: PropTypes.instanceOf(Date).isRequired,
  /** An array that contains all the nodes which need to be rendered. It contains the disabled, marked and active nodes also. */
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.instanceOf(Date).isRequired,
      label: PropTypes.string,
      disabled: PropTypes.bool,
      isActive: PropTypes.bool,
      isMarked: PropTypes.bool,
    })
  ).isRequired,
  /** A handler which is invoked when a date is selected */
  onSelect: PropTypes.func,
  /** A handler which is invoked when the left side button is clicked. */
  onPrev: PropTypes.func,
  /** A handler which is invoked when the right side button is clicked. */
  onNext: PropTypes.func,
  /** A handler which is invoked when the title is clicked. */
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

  const onYearSelect = dateStr => onSelect(new Date(dateStr))

  return (
    <BasicView
      title={getTitle(nodes)}
      groupName={`month-view-${name}`}
      className={className}
      columns={constants.YEAR_COLUMNS}
      rows={constants.YEAR_ROWS}
      nodes={nodes}
      onSelect={onYearSelect}
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

  @media screen and (max-width: 640px) {
    ${Node} {
      > span {
        width: ${`${NODE_WIDTH * 1.25}px`};
        height: ${`${NODE_HEIGHT * 1.25}px`};
      }
    }
  }
`

YearView.propTypes = propTypes
YearView.defaultProps = defaultProps

/** @component */
export default YearView
