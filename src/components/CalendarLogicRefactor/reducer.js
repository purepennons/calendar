import * as stateTypes from './stateTypes'
import * as eventTypes from './eventTypes'
import * as actions from './actions'

function reducer(state, event) {
  const { status, context } = state

  switch (status) {
    case stateTypes.dateView: {
      switch (event.type) {
        case eventTypes.INIT_DATE_VIEW:
          return {
            status: stateTypes.dateView,
            context: actions.initDateView(context, event),
          }
        case eventTypes.SELECT_DATE:
          return {
            status: stateTypes.dateView,
            context: actions.selectDate(context, event),
          }
        case eventTypes.GO_NEXT_MONTH:
          return {
            status: stateTypes.dateView,
            context: actions.goMonth(context, { ...event, offset: 1 }),
          }
        case eventTypes.GO_PREV_MONTH:
          return {
            status: stateTypes.dateView,
            context: actions.goMonth(context, { ...event, offset: -1 }),
          }
        case eventTypes.GO_MONTH_VIEW:
          return {
            status: stateTypes.monthView,
            context: actions.recalculateNodes(context, {
              ...event,
              status: stateTypes.monthView,
            }),
          }
        default:
          return state
      }
    }

    case stateTypes.monthView: {
      return state
    }

    case stateTypes.yearView: {
      return state
    }

    default:
      return state
  }
}

export default reducer
