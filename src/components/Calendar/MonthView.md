```jsx
import MonthView from './MonthView'

const nodes = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月',
].map((label, idx) => ({
  label,
  value: new Date(2020, idx, 1),
}))

nodes[0] = { ...nodes[0], isActive: true }
nodes[11] = { ...nodes[11], isMarked: true }
;<MonthView
  groupName="month-view-example"
  date={new Date(2020, 0, 6)}
  nodes={nodes}
/>
```
