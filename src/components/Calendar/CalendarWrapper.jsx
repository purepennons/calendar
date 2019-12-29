import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { noop } from 'lodash'

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
  onTitleClick: PropTypes.func,
}

const defaultProps = {
  className: '',
  onPrevClick: noop,
  onNextClick: noop,
  onTitleClick: noop,
}

function UnStyledCalendarWrapper(props) {
  const { className, title, onPrevClick, onNextClick, onTitleClick } = props
  return (
    <div className={className}>
      <div className="navigator">
        <button
          className="navigator__arrow"
          onClick={onPrevClick}
        >{`<`}</button>
        <button className="navigator__title" onClick={onTitleClick}>
          {title}
        </button>
        <button
          className="navigator__arrow"
          onClick={onNextClick}
        >{`>`}</button>
      </div>
      {props.children}
      <div>Button Groups</div>
    </div>
  )
}

UnStyledCalendarWrapper.propTypes = propTypes
UnStyledCalendarWrapper.defaultProps = defaultProps

const CalendarWrapper = styled(UnStyledCalendarWrapper)`
  border: ${props => `1px solid ${props.theme.colors.gray}`};

  .navigator {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;

    &__title,
    &__arrow {
      background: none;
      border: none;
    }

    &__title {
      flex: 4;
      font-size: ${props => props.theme.fonts.size.large};
      text-align: center;
    }

    &__arrow {
      flex: 1;
      margin-left: 20px;
      margin-right: 20px;
    }
  }
`

CalendarWrapper.propTypes = propTypes
CalendarWrapper.defaultProps = defaultProps

/** @component */
export default CalendarWrapper
