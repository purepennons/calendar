import { isFunction, pick } from 'lodash'
import { addMonths, addYears } from 'date-fns'

import * as stateTypes from './stateTypes'
import { getDateNodes, getMonthNodes, getYearNodes } from './utils'

const viewMap = {
  [stateTypes.dateView]: {
    key: 'date',
    getNodes: getDateNodes,
  },
  [stateTypes.monthView]: {
    key: 'month',
    getNodes: getMonthNodes,
  },
  [stateTypes.yearView]: {
    key: 'year',
    getNodes: getYearNodes,
  },
}

// common
export function recalculateNodes(ctx, event) {
  const { internalDate, selectedDate, maxNodes, period, nodes } = ctx
  const { status } = event
  const option = viewMap[status]
  const { key, getNodes } = pick(option, ['getNodes', 'key'])
  const nextNodes = isFunction(getNodes)
    ? getNodes(internalDate, {
        selectedDate,
        maxNodes: maxNodes[key],
        period: period[key],
      })
    : nodes

  return {
    ...ctx,
    nodes: nextNodes,
  }
}

// dateView
export function initDateView(ctx) {
  const { internalDate, selectedDate, maxNodes } = ctx
  return {
    ...ctx,
    nodes: getDateNodes(internalDate, {
      selectedDate,
      maxNodes: maxNodes.date,
    }),
  }
}

export function selectDate(ctx, event) {
  const { maxNodes, onSelect } = ctx
  const date = event.date

  onSelect(date)

  return {
    ...ctx,
    internalDate: date,
    selectedDate: date,
    nodes: getDateNodes(date, {
      selectedDate: date,
      maxNodes: maxNodes.date,
    }),
  }
}

export function goMonth(ctx, event) {
  const { internalDate, selectedDate, maxNodes } = ctx
  const offset = event.offset
  const date = addMonths(internalDate, offset)

  return {
    ...ctx,
    internalDate: date,
    nodes: getDateNodes(date, {
      selectedDate,
      maxNodes: maxNodes.date,
    }),
  }
}

// monthView
export function selectMonth(ctx, event) {
  const { maxNodes, onSelect } = ctx
  const date = event.date

  onSelect(date)

  return {
    ...ctx,
    internalDate: date,
    selectedDate: date,
    nodes: getDateNodes(date, {
      selectedDate: date,
      maxNodes: maxNodes.date,
    }),
  }
}

export function goYear(ctx, event) {
  const { internalDate, selectedDate } = ctx
  const offset = event.offset
  const date = addYears(internalDate, offset)

  return {
    ...ctx,
    internalDate: date,
    nodes: getMonthNodes(date, { selectedDate }),
  }
}

// yearView
export function selectYear(ctx, event) {
  const { onSelect } = ctx
  const date = event.date

  onSelect(date)

  return {
    ...ctx,
    internalDate: date,
    selectedDate: date,
    nodes: getMonthNodes(date, { selectedDate: date }),
  }
}

export function goPeriod(ctx, event) {
  const { internalDate, selectedDate, maxNodes, period } = ctx
  const offset = event.offset
  const date = addYears(internalDate, period.year * offset)

  return {
    ...ctx,
    internalDate: date,
    nodes: getYearNodes(date, {
      selectedDate,
      maxNodes: maxNodes.year,
      period: period.year,
    }),
  }
}
