import React from 'react'
import PropTypes from 'prop-types'
import styled, { css as cssHelper } from 'styled-components'
import { noop } from 'lodash'

const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  isActive: PropTypes.bool,
  isMarked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
}

const defaultProps = {
  className: '',
  onChange: noop,
}

function UnStyledNode(props) {
  const { className, name, value, label, disabled, isActive, onChange } = props
  return (
    <label className={className}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={!disabled && isActive}
        disabled={disabled}
        onChange={onChange}
      />
      <span>{label || value}</span>
    </label>
  )
}

UnStyledNode.propTypes = propTypes
UnStyledNode.defaultProps = defaultProps

// style
const markedStyle = cssHelper`
  color: ${props => props.theme.colors.primary};
`

const Node = styled(UnStyledNode)`
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;

  > span {
    display: inline-flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  > input {
    display: none;
  }

  > input:checked ~ span {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    border-radius: 50%;
  }

  > input:disabled ~ span {
    color: ${props => props.theme.colors.disabled};
    cursor: not-allowed;
  }

  ${props => !props.disabled && props.isMarked && markedStyle};
`

Node.propTypes = propTypes
Node.defaultProps = defaultProps

/** @component */
export default Node
