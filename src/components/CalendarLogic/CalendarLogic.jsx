import { Component } from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'
import { setDate, setMonth, setYear, isEqual as isDateEqual } from 'date-fns'

import { getDateListPair, getMonthListPair, getYearListPair } from './utils'

class CalendarLogic extends Component {
  constructor(props) {
    super(props)

    this.isUnmounted = false
    this.state = this.getDefaultState()
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props
    if (!isDateEqual(value, prevProps.value)) {
      this.setState(this.getDefaultState())
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true
  }

  getDefaultState = () => {
    const { value, defaultValue } = this.props
    return {
      internalDate: value || defaultValue || new Date(),
    }
  }

  getRenderProps = () => {
    const { value: date, yearPeriod: period } = this.props
    const { internalDate } = this.state

    return {
      date,
      internalDate,
      year: {
        ...getYearListPair(internalDate, { period }),
      },
      month: {
        ...getMonthListPair(),
      },
      day: {
        ...getDateListPair(internalDate),
      },
      handlers: {
        setYear: this.setYear,
        setMonth: this.setMonth,
        setDate: this.setDate,
        onSelect: this.onSelect,
      },
    }
  }

  safeSetState = (...args) => {
    if (this.isUnmounted) {
      return
    }

    this.setState(...args)
  }

  setYear = value => {
    this.safeSetState(({ internalDate }) => ({
      internalDate: setYear(internalDate, value),
    }))
  }

  setMonth = value => {
    this.safeSetState(({ internalDate }) => ({
      internalDate: setMonth(internalDate, value),
    }))
  }

  setDate = value => {
    this.safeSetState(({ internalDate }) => ({
      internalDate: setDate(internalDate, value),
    }))
  }

  onSelect = () => {
    this.props.onChange(this.state.internalDate)
  }

  render() {
    return this.props.children(this.getRenderProps())
  }
}

CalendarLogic.propTypes = {
  children: PropTypes.func.isRequired,
  defaultValue: PropTypes.instanceOf(Date),
  value: PropTypes.instanceOf(Date),
  yearPeriod: PropTypes.number,
  onChange: PropTypes.func,
}

CalendarLogic.defaultProps = {
  yearPeriod: 10,
  onChange: noop,
}

export default CalendarLogic
