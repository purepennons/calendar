import {} from 'date-fns'

import { getDateNodes } from './utils'

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
  const date = event.payload

  return {
    ...ctx,
    internalDate: event.payload,
    selectedDate: event.payload,
    nodes: getDateNodes(date, {
      selectedDate: date,
      maxNodes: maxNodes.date,
    }),
  }
}
