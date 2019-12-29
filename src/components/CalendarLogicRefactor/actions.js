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
  return {
    ...ctx,
    internalDate: event.payload,
    selectedDate: event.payload,
  }
}
