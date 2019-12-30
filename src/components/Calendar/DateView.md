```jsx
import { range } from 'lodash'
import { getDate } from 'date-fns'
import DateView from './DateView'

const convertToNode = date => ({ value: date, label: String(getDate(date)) })

const prevNodes = [29, 30, 31]
  .map(day => new Date(2019, 11, day))
  .map(convertToNode)
  .map(node => ({ ...node, disabled: true }))
const activeNodes = range(1, 31 + 1)
  .map(day => new Date(2020, 0, day))
  .map(convertToNode)
const nextNodes = range(1, 8 + 1)
  .map(day => new Date(2020, 1, day))
  .map(convertToNode)
  .map(node => ({ ...node, disabled: true }))

activeNodes[10] = { ...activeNodes[10], isActive: true }
activeNodes[5] = { ...activeNodes[5], isMarked: true }

const nodes = prevNodes.concat(activeNodes).concat(nextNodes)

;<DateView
  groupName="date-view-example"
  date={new Date(2020, 0, 6)}
  nodes={nodes}
/>
```
