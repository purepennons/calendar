import { range } from 'lodash'
import { pipe, slice } from 'lodash/fp'
import { getDaysInMonth, getYear, getDay, addMonths, addYears } from 'date-fns'

// basic date utils
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

export function getDateListPair(date) {
  return {
    prev: getDateList(addMonths(date, -1)),
    curr: getDateList(date),
    next: getDateList(addMonths(date, 1)),
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

// CalendarLogic
export function convertListToNode(list) {
  return list.map(value => ({ value, label: String(value) }))
}

export function disableList(list) {
  return list.map(obj => ({ ...obj, disabled: true }))
}

// CalendarLogic - date
export function getPrevDateNodes({ prevDateList, startIndex }) {
  return pipe(
    convertListToNode,
    slice(prevDateList.length - startIndex, prevDateList.length),
    disableList
  )(prevDateList)
}

export function getNextDateNodes({
  nextDateList,
  currDateList,
  prevDateList,
  startIndex,
  maxNodes,
}) {
  return pipe(
    convertListToNode,
    slice(
      0,
      maxNodes -
        currDateList.length -
        getPrevDateNodes({ prevDateList, startIndex }).length
    ),
    disableList
  )(nextDateList)
}

export function getCurrentDateNodes({ currDateList }) {
  return pipe(convertListToNode)(currDateList)
}

export function getDateNodes(date, { maxNodes }) {
  const {
    prev: prevDateList,
    curr: currDateList,
    next: nextDateList,
  } = getDateListPair(date)
  const startIndex = getDay(date)

  const prevNodes = getPrevDateNodes({ prevDateList, startIndex })
  const currentNodes = getCurrentDateNodes({ currDateList })
  const nextNodes = getNextDateNodes({
    nextDateList,
    currDateList,
    prevDateList,
    startIndex,
    maxNodes,
  })

  return prevNodes.concat(currentNodes).concat(nextNodes)
}
