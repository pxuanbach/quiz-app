import { createGlobalStyle } from 'styled-components'
import theme from './theme'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  body {
    font: 400 16px Roboto, sans-serif;
    color: ${theme.colors.contrastText};
    font-size: 16px;
  }

  button, a {
    cursor: pointer;
  }
`
