```jsx
import { range } from 'lodash'
import { getYear } from 'date-fns'
import YearView from './YearView'

const convertToNode = date => ({ value: date, label: String(getYear(date)) })

const prevNodes = [
  { value: new Date(2019, 0, 11), label: '2019', disabled: true },
]
const activeNodes = range(2020, 2029 + 1)
  .map(year => new Date(year, 0, 11))
  .map(convertToNode)
const nextNodes = [
  { value: new Date(2020, 0, 11), label: '2030', disabled: true },
]

activeNodes[0] = { ...activeNodes[0], isActive: true }
activeNodes[4] = { ...activeNodes[4], isMarked: true }

const nodes = prevNodes.concat(activeNodes).concat(nextNodes)

;<YearView
  groupName="year-view-example"
  date={new Date(2020, 0, 11)}
  nodes={nodes}
/>
```
