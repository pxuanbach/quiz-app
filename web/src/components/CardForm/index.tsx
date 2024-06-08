import React from 'react'
import { Container, HeaderStyled } from './style'

const CardForm: React.FC<{
  header: string
  background?: string
}> = ({ children, header }) => {
  return (
    <Container>
      <HeaderStyled>
        <p>{header}</p>
      </HeaderStyled>
      <div className="content">{children}</div>
    </Container>
  )
}

export default CardForm
