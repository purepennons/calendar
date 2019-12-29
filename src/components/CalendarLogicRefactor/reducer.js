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
