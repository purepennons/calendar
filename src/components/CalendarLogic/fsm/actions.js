import { isFunction, pick } from 'lodash'
import { addMonths, addYears } from 'date-fns'
import { assign } from 'xstate'

import * as stateTypes from '../stateTypes'
import { getDateNodes, getMonthNodes, getYearNodes } from '../utils'

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
export const recalculateNodes = status =>
  assign(ctx => {
    const { internalDate, selectedDate, maxNodes, period, nodes } = ctx
    const option = viewMap[status]
    const { key, getNodes } = pick(option, ['getNodes', 'key'])
    const nextNodes = isFunction(getNodes)
      ? getNodes(internalDate, {
          selectedDate,
          maxNodes: maxNodes[key],
          period: period[key],
        })
      : nodes

    ctx.nodes = nextNodes
  })

// dateView
export const initDateView = assign(ctx => {
  const { internalDate, selectedDate, maxNodes } = ctx
  ctx.nodes = getDateNodes(internalDate, {
    selectedDate,
    maxNodes: maxNodes.date,
  })
})

export const selectDate = assign((ctx, event) => {
  const { maxNodes, onSelect } = ctx
  const date = event.date

  ctx.internalDate = date
  ctx.selectedDate = date
  ctx.nodes = getDateNodes(date, {
    selectedDate: date,
    maxNodes: maxNodes.date,
  })

  onSelect(date)
})

export const goMonth = offset =>
  assign(ctx => {
    const { internalDate, selectedDate, maxNodes } = ctx
    const date = addMonths(internalDate, offset)

    ctx.internalDate = date
    ctx.nodes = getDateNodes(date, {
      selectedDate,
      maxNodes: maxNodes.date,
    })
  })

export const goNextMonth = goMonth(1)

export const goPrevMonth = goMonth(-1)

export const goMonthView = recalculateNodes(stateTypes.monthView)

// monthView
export const selectMonth = assign((ctx, event) => {
  const { maxNodes, onSelect } = ctx
  const date = event.date

  ctx.internalDate = date
  ctx.selectedDate = date
  ctx.nodes = getDateNodes(date, {
    selectedDate: date,
    maxNodes: maxNodes.date,
  })

  onSelect(date)
})

export const goYear = offset =>
  assign(ctx => {
    const { internalDate, selectedDate } = ctx
    const date = addYears(internalDate, offset)

    ctx.internalDate = date
    ctx.nodes = getMonthNodes(date, { selectedDate })
  })

export const goNextYear = goYear(1)

export const goPrevYear = goYear(-1)

export const goYearView = recalculateNodes(stateTypes.yearView)

// yearView
export const selectYear = assign((ctx, event) => {
  const { onSelect } = ctx
  const date = event.date

  ctx.internalDate = date
  ctx.selectedDate = date
  ctx.nodes = getMonthNodes(date, { selectedDate: date })

  onSelect(date)
})

export const goPeriod = offset =>
  assign(ctx => {
    const { internalDate, selectedDate, maxNodes, period } = ctx
    const date = addYears(internalDate, period.year * offset)

    ctx.internalDate = date
    ctx.nodes = getYearNodes(date, {
      selectedDate,
      maxNodes: maxNodes.year,
      period: period.year,
    })
  })

export const goNextPeriod = goPeriod(1)

export const goPrevPeriod = goPeriod(-1)

export const goDateView = recalculateNodes(stateTypes.dateView)
