import React from 'react'
import { AppProps } from 'next/app'

import GlobalStyle from '../styles/global'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import { QuizProvider } from '../hooks/Quiz'
import { AuthProvider } from '../hooks/Auth'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <AuthProvider>
        <QuizProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
          </ThemeProvider>
        </QuizProvider>
      </AuthProvider>
    </>
  )
}

export default MyApp
