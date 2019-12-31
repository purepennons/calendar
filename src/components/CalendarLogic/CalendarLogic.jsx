import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'
import { useMachine } from '@xstate/react'

import constants from '../../constants'
import machine from './fsm/machine'
import * as eventTypes from './eventTypes'
import * as stateTypes from './stateTypes'

const propTypes = {
  /** All render props will be injected to the function. */
  children: PropTypes.func.isRequired,
  /** Current date, for controlled component. */
  date: PropTypes.instanceOf(Date),
  /** Default date, for uncontrolled component. */
  defaultDate: PropTypes.instanceOf(Date),
  /** A number that defines the max length of nodes in the date view. */
  maxDateNodes: PropTypes.number,
  /** A number that defines the max length of nodes in the month view. */
  maxMonthNodes: PropTypes.number,
  /** A number that defines the max length of nodes in the year view. */
  maxYearNodes: PropTypes.number,
  /** A number that defines how many offset between each page. */
  yearPeriod: PropTypes.number,
  /** A handler which is invoked when a date is selected */
  onSelect: PropTypes.func,
}

const defaultProps = {
  maxDateNodes: constants.DATE_COLUMNS * constants.DATE_ROWS,
  maxMonthNodes: constants.MONTH_COLUMNS * constants.MONTH_ROWS,
  maxYearNodes: constants.YEAR_COLUMNS * constants.YEAR_ROWS,
  yearPeriod: constants.YEAR_PERIOD,
  onSelect: noop,
}

function CalendarLogic(props) {
  const {
    date,
    defaultDate,
    maxDateNodes,
    maxMonthNodes,
    maxYearNodes,
    yearPeriod,
    onSelect,
  } = props

  const initialContext = {
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
    onSelect,
  }

  const [current, send] = useMachine(machine, { context: initialContext })

  useEffect(() => {
    send({ type: eventTypes.INIT_DATE_VIEW })
  }, [send])

  return props.children({
    ...current,
    current,
    send,
    stateTypes,
    eventTypes,
    status: current.value,
    dispatch: send,
  })
}

CalendarLogic.propTypes = propTypes
CalendarLogic.defaultProps = defaultProps

/** @component */
export default CalendarLogic
