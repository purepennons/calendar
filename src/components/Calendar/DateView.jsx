import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { format } from 'date-fns'

import constants from '../../constants/'
import BasicView from './BasicView'

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string,
      disabled: PropTypes.bool,
      isActive: PropTypes.bool,
      isMarked: PropTypes.bool,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func.isRequired,
}

const defaultProps = {
  className: '',
  name: '',
}

function UnStyledDateView(props) {
  const {
    className,
    name,
    date,
    nodes,
    onSelect,
    onPrev,
    onNext,
    onTitleClick,
  } = props
  return (
    <BasicView
      title={format(date, 'MMMyyyy')}
      groupName={`date-view-${name}`}
      className={className}
      columns={constants.DATE_COLUMNS}
      rows={constants.DATE_ROWS}
      headers={DAYS}
      nodes={nodes}
      onSelect={onSelect}
      onPrevClick={onPrev}
      onNextClick={onNext}
      onTitleClick={onTitleClick}
    />
  )
}

UnStyledDateView.propTypes = propTypes
UnStyledDateView.defaultProps = defaultProps

const DateView = styled(UnStyledDateView)``

DateView.propTypes = propTypes
DateView.defaultProps = defaultProps

/** @component */
export default DateView
