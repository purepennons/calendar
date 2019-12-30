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
