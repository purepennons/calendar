import { Machine } from 'xstate'

import { fsm } from './fsm'
import * as actions from './actions'

export default Machine(fsm, { actions })
