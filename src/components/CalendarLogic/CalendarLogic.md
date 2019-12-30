The compoent is a render props based component. It provides the core logic of calendar. You can trigger an action by `dispatch` an `event`.

### Render Props

These are the arguments that are passed into the `children(renderProps)`.

#### status

Present the current state (view).

#### context

The infinite states about calendar. It contains the following values.

- internalDate: An core internal state that is used in the calendar.
- selectedDate: The selected date.
- nodes: An array that represents the current dates which could be injected to the corresponding views. Each node has the following properties. You can see the `DateView` or `MonthView` or `YearView` sections for details.
  - value
  - label
  - disabled
  - isActive
  - isMarked
- maxNodes: An object that describes how many nodes are generated on the different kinds of views.
- period: An object that describes which offsets are used in the `GO_NEXT_XXX` and `GO_PREV_XXX` events. Only year period is used currently.
- onSelect: No need the function usually. It will be invoked automatically when a date is selected.

#### dispatch

A function to trigger an event. This is from the `useReducer`.

#### stateTypes

The one of the type will be the value of `status`. It contains the following states.

- `dateView`
- `monthView`
- `yearView`

#### eventTypes

The values of the object are the event types. They are used for `dispatch` an `event`. A `event` must be a shape like `{ type: eventType, ...otherPayload }`. Just like an redux action.

It contains the following types. Each event is belong to a `status` and only can be invoked when the `status` is matched.

- `dateView`

  - `INIT_DATE_VIEW`
  - `SELECT_DATE`
  - `GO_NEXT_MONTH`
  - `GO_PREV_MONTH`
  - `GO_MONTH_VIEW`

- `monthView`

  - `SELECT_MONTH`
  - `GO_NEXT_YEAR`
  - `GO_PREV_YEAR`
  - `GO_YEAR_VIEW`

- `yearView`
  - `SELECT_YEAR`
  - `GO_NEXT_PERIOD`
  - `GO_PREV_PERIOD`
  - `GO_DATE_VIEW`

```jsx
import { useState } from 'react'
import styled from 'styled-components'
import CalendarLogic from './CalendarLogic'

const Container = styled.div``

const ControllorForm = styled.form``

const RadioGroup = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

const [inputDate, setInputDate] = useState(new Date())
const [action, setAction] = useState('')

;<CalendarLogic>
  {({ status, context, dispatch, eventTypes }) => {
    return (
      <Container>
        <p>{`Current View: ${status}`}</p>
        <p>{`internalDate: ${context.internalDate &&
          context.internalDate.toString()}`}</p>
        <p>{`selectedDate: ${context.selectedDate &&
          context.selectedDate.toString()}`}</p>
        <ControllorForm
          onSubmit={event => {
            event.preventDefault()
            dispatch({ type: eventTypes[action], date: new Date(inputDate) })
          }}
        >
          <div>
            <label>
              <span>input payload: </span>
              <input
                type="date"
                value={inputDate}
                onChange={event => setInputDate(event.target.value)}
              />
            </label>
          </div>
          <RadioGroup>
            <p>Select an event type to dispatch:</p>
            {Object.entries(eventTypes).map(([actionKey, actionName], idx) => (
              <label key={actionKey}>
                <input
                  type="radio"
                  value={actionKey}
                  checked={action === actionKey}
                  onChange={event => setAction(event.target.value)}
                />
                {actionName}
              </label>
            ))}
          </RadioGroup>
          <button type="submit">Dispatch</button>
        </ControllorForm>
      </Container>
    )
  }}
</CalendarLogic>
```
