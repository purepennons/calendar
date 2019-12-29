import React from 'react'
import PropTypes from 'prop-types'

import constants from '../../constants/'
import CalendarLogic from '../CalendarLogic/'
import DateView from './DateView'
import MonthView from './MonthView'
import YearView from './YearView'

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
        switch (status) {
          case stateTypes.dateView:
            return (
              <DateView
                name={name}
                date={context.internalDate}
                nodes={context.nodes}
                onSelect={date =>
                  dispatch({ type: eventTypes.SELECT_DATE, date })
                }
                onPrev={() => dispatch({ type: eventTypes.GO_PREV_MONTH })}
                onNext={() => dispatch({ type: eventTypes.GO_NEXT_MONTH })}
                onTitleClick={() =>
                  dispatch({ type: eventTypes.GO_MONTH_VIEW })
                }
              />
            )
          case stateTypes.monthView:
            return (
              <MonthView
                name={name}
                date={context.internalDate}
                nodes={context.nodes}
                onSelect={date =>
                  dispatch({ type: eventTypes.SELECT_MONTH, date })
                }
                onPrev={() => dispatch({ type: eventTypes.GO_PREV_YEAR })}
                onNext={() => dispatch({ type: eventTypes.GO_NEXT_YEAR })}
                onTitleClick={() => dispatch({ type: eventTypes.GO_YEAR_VIEW })}
              />
            )
          case stateTypes.yearView:
            return (
              <YearView
                name={name}
                date={context.internalDate}
                nodes={context.nodes}
                onSelect={date =>
                  dispatch({ type: eventTypes.SELECT_YEAR, date })
                }
                onPrev={() => dispatch({ type: eventTypes.GO_PREV_PERIOD })}
                onNext={() => dispatch({ type: eventTypes.GO_NEXT_PERIOD })}
                onTitleClick={() => dispatch({ type: eventTypes.GO_DATE_VIEW })}
              />
            )
          default:
            return null
        }
      }}
    </CalendarLogic>
  )
}

Calendar.propTypes = propTypes
Calendar.defaultProps = defaultProps

/** @component */
export default Calendar
