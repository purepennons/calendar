import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function UnStyledCalendarWrapper(props) {
  const { className } = props
  return (
    <div className={className}>
      <div>navigation</div>
      {props.children}
      <div>Button Groups</div>
    </div>
  )
}

const CalendarWrapper = styled(UnStyledCalendarWrapper)``

CalendarWrapper.propTypes = {
  className: PropTypes.string,
}

CalendarWrapper.defaultProps = {
  className: '',
}

/** @component */
export default CalendarWrapper
