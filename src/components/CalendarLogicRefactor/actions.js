import { isFunction, get } from 'lodash'
import { addMonths } from 'date-fns'

import * as stateTypes from './stateTypes'
import { getDateNodes, getMonthNodes } from './utils'

const viewMap = {
  [stateTypes.dateView]: {
    getNodes: getDateNodes,
  },
  [stateTypes.monthView]: {
    getNodes: getMonthNodes,
  },
  [stateTypes.yearView]: {},
}

// common
export function recalculateNodes(ctx, event) {
  const { internalDate, selectedDate, maxNodes, nodes } = ctx
  const { status } = event
  const getNode = get(viewMap, [status, 'getNodes'])
  const nextNodes = isFunction(getNode)
    ? getNode(internalDate, { maxNodes, selectedDate })
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
  const { maxNodes } = ctx
  const date = event.date

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

// yearView
