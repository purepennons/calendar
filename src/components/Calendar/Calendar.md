```jsx
import { useState } from 'react'
import Calendar from './Calendar'

const [date, setDate] = useState(new Date(2020, 1, 11))

;<Calendar
  name="calendar-example"
  date={date}
  onSelect={date => {
    console.log('select', date)
    setDate(date)
  }}
/>
```
