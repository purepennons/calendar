import { range } from 'lodash'
import { getDaysInMonth, getYear } from 'date-fns'

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
