```jsx
import { range } from 'lodash'
import BasicView from './BasicView'

const headers = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const nodes = range(1, 42 + 1).map(v => ({ value: v, label: String(v) }))
;<BasicView
  groupName="basic-view-example"
  columns={7}
  rows={6}
  headers={headers}
  nodes={nodes}
  onNodeClick={v => console.log('value clicked', v)}
/>
```
