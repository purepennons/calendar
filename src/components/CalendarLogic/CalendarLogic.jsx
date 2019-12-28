import { Component } from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'
import { setDate, setMonth, setYear, isSameDay } from 'date-fns'

import { getDateNodes, getMonthNodes, getYearNodes } from './utils'

class CalendarLogic extends Component {
  constructor(props) {
    super(props)

    this.isUnmounted = false
    this.state = this.getDefaultState()
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props
    if (!isSameDay(value, prevProps.value)) {
      this.setState(this.getDefaultState())
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true
  }

  safeSetState = (...args) => {
    if (this.isUnmounted) {
      return
    }

    this.setState(...args)
  }

  getDefaultState = () => {
    const { value, defaultValue } = this.props
    return {
      internalDate: value || defaultValue || new Date(),
    }
  }

  getRenderProps = () => {
    const { value: date } = this.props
    const { internalDate } = this.state

    return {
      date,
      internalDate,
      handlers: {
        setYear: this.setYear,
        setMonth: this.setMonth,
        setDate: this.setDate,
        getDateNodes: this.getDateNodes,
        getMonthNodes: this.getMonthNodes,
        getYearNodes: this.getYearNodes,
        onSelect: this.onSelect,
      },
    }
  }

  getDateNodes = ({ maxNodes }) => {
    return getDateNodes(this.state.internalDate, { maxNodes })
  }

  getMonthNodes = () => {
    return getMonthNodes()
  }

  getYearNodes = ({ maxNodes, period }) => {
    return getYearNodes(this.state.internalDate, { maxNodes, period })
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
  onChange: PropTypes.func,
}

CalendarLogic.defaultProps = {
  onChange: noop,
}

export default CalendarLogic
