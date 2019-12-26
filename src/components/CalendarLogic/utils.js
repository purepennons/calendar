import { range } from 'lodash'
import { getDaysInMonth, getYear, addMonths, addYears } from 'date-fns'

export function rangeIncludeLast(start, end) {
  return range(start, end + 1)
}

export function getDateList(date) {
  return rangeIncludeLast(1, getDaysInMonth(date))
}

export function getMonthList() {
  return rangeIncludeLast(1, 12)
}

export function getYearList(date, { period = 10 } = { period: 10 }) {
  const year = getYear(date)
  const base = Math.floor(year / period)
  return range(period * base, period * (base + 1))
}

// For CalendarLogic
export function getDateListPair(date) {
  return {
    prev: getDateList(addMonths(date, -1)),
    curr: getDateList(date),
    next: getDateList(addMonths(date, 1)),
  }
}

export function getMonthListPair() {
  const list = getMonthList()

  return {
    prev: list,
    curr: list,
    next: list,
  }
}

export function getYearListPair(date, { period = 10 } = { period: 10 }) {
  const options = { period }

  return {
    prev: getYearList(addYears(date, -1), options),
    curr: getYearList(date, options),
    next: getYearList(addYears(date, 1), options),
  }
}
