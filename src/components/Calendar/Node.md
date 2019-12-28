```jsx
import styled from 'styled-components'
import Node from './Node'

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

const Wrapper = styled.div`
  width: 80px;
  height: 80px;
  margin: 20px;
`

const groupName = 'node-example'

;<Container>
  <Wrapper key="1">
    <Node name={groupName} value="10" />
  </Wrapper>
  <Wrapper key="2">
    <Node name={groupName} isActive value="11" />
  </Wrapper>
  <Wrapper key="3">
    <Node name={groupName} isMarked value="12" />
  </Wrapper>
  <Wrapper key="4">
    <Node name={groupName} value="13" disabled />
  </Wrapper>
</Container>
```
