import { get, range } from 'lodash'
import { pipe, slice, map, curry } from 'lodash/fp'
import {
  format,
  getDay,
  getYear,
  getMonth,
  getDate,
  getDaysInMonth,
  isSameDay,
  addMonths,
} from 'date-fns'

const formatTokenMap = {
  date: 'd',
  month: 'MMM',
  year: 'yyyy',
}

export const today = new Date()

export function rangeIncludeLast(start, end) {
  return range(start, end + 1)
}

export function getDatePairs(date) {
  return {
    year: getYear(date),
    month: getMonth(date),
    day: getDate(date),
  }
}

export function getDateList(date) {
  return rangeIncludeLast(1, getDaysInMonth(date))
}

export function getMonthList() {
  return range(0, 12)
}

export function getYearList(date, { period = 10 } = { period: 10 }) {
  const year = getYear(date)
  const base = Math.floor(year / period)
  return range(period * base, period * (base + 1))
}

export function getDatesFromDateList(date) {
  const { year, month } = getDatePairs(date)
  return getDateList(date).map(day => new Date(year, month, day))
}

export function getDatesFromMonthList(date) {
  const { year, day } = getDatePairs(date)
  return getMonthList(date).map(month => new Date(year, month, day))
}

export function getDatesFromYearList(date, { period = 10 } = { period: 10 }) {
  const { month, day } = getDatePairs(date)
  return getYearList(date, { period }).map(year => new Date(year, month, day))
}

export function getSiblingDatesPairsByMonth(date) {
  return {
    prev: getDatesFromDateList(addMonths(date, -1)),
    curr: getDatesFromDateList(date),
    next: getDatesFromDateList(addMonths(date, 1)),
  }
}

// export function getSiblingDatesPairsByYear(date, { period = 10 } = { period: 10 }) {
//   const options = { period }

//   return {
//     prev: getYearList(addYears(date, -1), options),
//     curr: getYearList(date, options),
//     next: getYearList(addYears(date, 1), options),
//   }
// }

// CalendarLogic
export const convertListToNode = curry(function convertListToNode(
  formatToken,
  list
) {
  return list.map(date => ({
    value: date,
    label: formatToken ? format(date, formatToken) : String(date),
  }))
})

export function disableList(list) {
  return list.map(obj => ({ ...obj, disabled: true }))
}

// CalendarLogic - date
export function getPrevDateNodes({ prevDates, startIndex }) {
  return pipe(
    slice(Math.max(prevDates.length - startIndex, 0), prevDates.length),
    convertListToNode(formatTokenMap.date),
    disableList
  )(prevDates)
}

export function getNextDateNodes({
  nextDates,
  currDates,
  prevDates,
  startIndex,
  maxNodes,
}) {
  return pipe(
    slice(
      0,
      maxNodes -
        currDates.length -
        getPrevDateNodes({ prevDates, startIndex }).length
    ),
    convertListToNode(formatTokenMap.date),
    disableList
  )(nextDates)
}

export function getCurrentDateNodes({ currDates, selectedDate }) {
  return pipe(
    convertListToNode(formatTokenMap.date),
    map(node =>
      isSameDay(today, node.value) ? { ...node, isMarked: true } : node
    ),
    map(node =>
      isSameDay(selectedDate, node.value) ? { ...node, isActive: true } : node
    )
  )(currDates)
}

export function getDateNodes(date, { maxNodes, selectedDate }) {
  const {
    prev: prevDates,
    curr: currDates,
    next: nextDates,
  } = getSiblingDatesPairsByMonth(date)
  const startIndex = getDay(get(currDates, [0], prevDates.length))
  const prevNodes = getPrevDateNodes({ prevDates, startIndex })
  const currentNodes = getCurrentDateNodes({ currDates, selectedDate })
  const nextNodes = getNextDateNodes({
    nextDates,
    currDates,
    prevDates,
    startIndex,
    maxNodes,
  })

  return prevNodes.concat(currentNodes).concat(nextNodes)
}

// CalendarLogic - month
export function getMonthNodes(date) {
  return convertListToNode(formatTokenMap.month, getDatesFromMonthList(date))
}
