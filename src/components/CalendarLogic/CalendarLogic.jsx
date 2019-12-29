import { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

import constants from '../../constants/'

import * as eventTypes from './eventTypes'
import * as stateTypes from './stateTypes'
import reducer from './reducer'

const propTypes = {
  children: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date),
  defaultDate: PropTypes.instanceOf(Date),
  maxDateNodes: PropTypes.number,
  maxMonthNodes: PropTypes.number,
  maxYearNodes: PropTypes.number,
  yearPeriod: PropTypes.number,
  onChange: PropTypes.func,
}

const defaultProps = {
  maxDateNodes: constants.DATE_COLUMNS * constants.DATE_ROWS,
  maxMonthNodes: constants.MONTH_COLUMNS * constants.MONTH_ROWS,
  maxYearNodes: constants.YEAR_COLUMNS * constants.YEAR_ROWS,
  yearPeriod: constants.YEAR_PERIOD,
  onChange: noop,
}

function CalendarLogic(props) {
  const {
    date,
    defaultDate,
    maxDateNodes,
    maxMonthNodes,
    maxYearNodes,
    yearPeriod,
  } = props
  const initialState = {
    status: stateTypes.dateView,
    context: {
      internalDate: date || defaultDate || new Date(),
      selectedDate: date || defaultDate || null,
      nodes: [],
      maxNodes: {
        date: maxDateNodes,
        month: maxMonthNodes,
        year: maxYearNodes,
      },
      period: {
        year: yearPeriod,
      },
    },
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: eventTypes.INIT_DATE_VIEW })
  }, [])

  return props.children({
    ...state,
    dispatch,
    stateTypes,
    eventTypes,
  })
}

CalendarLogic.propTypes = propTypes
CalendarLogic.defaultProps = defaultProps

export default CalendarLogic
