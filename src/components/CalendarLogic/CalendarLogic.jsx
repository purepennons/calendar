import { Component } from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

import { getDateList } from './utils'

class CalendarLogic extends Component {
  constructor(props) {
    super(props)

    this.state = this.getDefaultState()
  }

  getDefaultState = () => {
    const { value } = this.props
    return {
      internalDate: value || new Date(),
    }
  }

  getRenderProps = () => {
    return
  }

  render() {
    return this.props.children(this.getRenderProps())
  }
}

CalendarLogic.propTypes = {
  children: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
}

CalendarLogic.defaultProps = {
  onChange: noop,
}

export default CalendarLogic
