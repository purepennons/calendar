```jsx
import { range } from 'lodash'
import DateView from './DateView'

const getDisabledNodes = num =>
  range(1, num).map(v => ({
    value: v,
    label: String(v),
    disabled: true,
  }))

const nodes = range(1, 28 + 1).map(v => ({ value: v, label: String(v) }))

;<DateView
  groupName="date-view-example"
  nodes={getDisabledNodes(3)
    .concat(nodes)
    .concat(getDisabledNodes(30))}
  onPrev={v => console.log('value clicked', v)}
/>
```
