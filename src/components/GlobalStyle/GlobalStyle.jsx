import { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  * {
    box-sizing: border-box;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  html {
    font-size: 16px;
  }

  h1 {
    font-size: ${props => props.theme.fonts.size.large};
  }

  h2, p, span {
    font-size: ${props => props.theme.fonts.size.middle};
  }
`

export default GlobalStyle
