import React from 'react'
import PropTypes from 'prop-types'

import constants from '../../constants/'
import CalendarLogic from '../CalendarLogicRefactor/'
import DateView from './DateView'

const propTypes = {
  name: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  defaultDate: PropTypes.instanceOf(Date),
}

const defaultProps = {
  name: '',
  defaultDate: new Date(),
}

function Calendar(props) {
  const { name, date, defaultDate } = props

  return (
    <CalendarLogic
      date={date}
      defaultDate={defaultDate}
      maxDateNodes={constants.DATE_COLUMNS * constants.DATE_ROWS}
      maxMonthNodes={constants.MONTH_COLUMNS * constants.MONTH_ROWS}
      maxYearNodes={constants.YEAR_COLUMNS * constants.YEAR_ROWS}
    >
      {({ status, context, stateTypes, eventTypes, dispatch }) => {
        const onDateSelect = date => {
          dispatch({ type: eventTypes.SELECT_DATE, payload: date })
        }

        switch (status) {
          case stateTypes.dateView:
            return (
              <DateView
                name={name}
                date={context.internalDate}
                nodes={context.nodes}
                onSelect={onDateSelect}
              />
            )
          default:
            return (
              <DateView
                name={name}
                date={context.internalDate}
                nodes={context.nodes}
                onSelect={onDateSelect}
              />
            )
        }
      }}
    </CalendarLogic>
  )
}

Calendar.propTypes = propTypes
Calendar.defaultProps = defaultProps

/** @component */
export default Calendar
