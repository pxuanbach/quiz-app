import React from 'react'
import { Background } from './style'
import Header from './Header'

const Layout: React.FC<{
  background?: string
  padding?: boolean
}> = ({ children, background, padding }) => {
  return (
    <>
      <Header />
      <Background background={background} padding={padding}>
        <div>{children}</div>
      </Background>
    </>
  )
}

export default Layout
