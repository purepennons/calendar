import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'

import theme from './styles/theme/'
import GlobalStyle from './components/GlobalStyle/'
import Calendar from './components/Calendar/'

function App(props) {
  const { className } = props
  return (
    <ThemeProvider theme={theme}>
      <>
        <div className={className}>
          <h1>Trend Micro - Frontend Task</h1>
          <h2>Calendar</h2>
          <Calendar name="trendmicro-calendar" defaultDate={new Date()} />
        </div>
        <GlobalStyle />
      </>
    </ThemeProvider>
  )
}

App.propTypes = {
  className: PropTypes.string.isRequired,
}

export default styled(App)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
