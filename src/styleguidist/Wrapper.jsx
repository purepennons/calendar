import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../components/GlobalStyle/'

import theme from '../styles/theme/'

class Wrapper extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          {this.props.children}
          <GlobalStyle />
        </>
      </ThemeProvider>
    )
  }
}

export default Wrapper
