import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { noop, isNumber } from 'lodash'

import constants from '../../constants/'
import CalendarLogic from '../CalendarLogic/'
import DateView from './DateView'
import MonthView from './MonthView'
import YearView from './YearView'

const propTypes = {
  /** The className of root tag */
  className: PropTypes.string,
  /** The name attribute. */
  name: PropTypes.string,
  /** Current date, for controlled component. */
  date: PropTypes.instanceOf(Date),
  /** Default date, for uncontrolled component. */
  defaultDate: PropTypes.instanceOf(Date),
  /** The handler will be invoked with a date argument when a date is selected */
  onSelect: PropTypes.func,
  /** calendar width */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** calendar height */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

const defaultProps = {
  className: '',
  name: '',
  defaultDate: new Date(),
  onSelect: noop,
  width: '300px',
  height: 'auto',
}

function UnStyledCalendar(props) {
  const { className, name, date, defaultDate, onSelect } = props

  return (
    <CalendarLogic
      date={date}
      defaultDate={defaultDate}
      maxDateNodes={constants.DATE_COLUMNS * constants.DATE_ROWS}
      maxMonthNodes={constants.MONTH_COLUMNS * constants.MONTH_ROWS}
      maxYearNodes={constants.YEAR_COLUMNS * constants.YEAR_ROWS}
      onSelect={onSelect}
    >
      {({ current, context, stateTypes, eventTypes, dispatch }) => {
        const dateView = current.matches(stateTypes.dateView) ? (
          <DateView
            name={name}
            date={context.internalDate}
            nodes={context.nodes}
            onSelect={date => dispatch({ type: eventTypes.SELECT_DATE, date })}
            onPrev={() => dispatch({ type: eventTypes.GO_PREV_MONTH })}
            onNext={() => dispatch({ type: eventTypes.GO_NEXT_MONTH })}
            onTitleClick={() => dispatch({ type: eventTypes.GO_MONTH_VIEW })}
          />
        ) : null

        const monthView = current.matches(stateTypes.monthView) ? (
          <MonthView
            name={name}
            date={context.internalDate}
            nodes={context.nodes}
            onSelect={date => dispatch({ type: eventTypes.SELECT_MONTH, date })}
            onPrev={() => dispatch({ type: eventTypes.GO_PREV_YEAR })}
            onNext={() => dispatch({ type: eventTypes.GO_NEXT_YEAR })}
            onTitleClick={() => dispatch({ type: eventTypes.GO_YEAR_VIEW })}
          />
        ) : null

        const yearView = current.matches(stateTypes.yearView) ? (
          <YearView
            name={name}
            date={context.internalDate}
            nodes={context.nodes}
            onSelect={date => dispatch({ type: eventTypes.SELECT_YEAR, date })}
            onPrev={() => dispatch({ type: eventTypes.GO_PREV_PERIOD })}
            onNext={() => dispatch({ type: eventTypes.GO_NEXT_PERIOD })}
            onTitleClick={() => dispatch({ type: eventTypes.GO_DATE_VIEW })}
          />
        ) : null

        return (
          <div className={className} name={name} data-testid={name}>
            {dateView}
            {monthView}
            {yearView}
          </div>
        )
      }}
    </CalendarLogic>
  )
}

UnStyledCalendar.propTypes = propTypes
UnStyledCalendar.defaultProps = defaultProps

const Calendar = styled(UnStyledCalendar)`
  margin: 0 auto;
  width: ${({ width }) => (isNumber(width) ? `${width}px` : width)};
  height: ${({ height }) => (isNumber(height) ? `${height}px` : height)};

  @media screen and (max-width: 640px) {
    width: 100%;
    height: 100%;
  }
`

Calendar.propTypes = propTypes
Calendar.defaultProps = defaultProps

/** @component */
export default Calendar
