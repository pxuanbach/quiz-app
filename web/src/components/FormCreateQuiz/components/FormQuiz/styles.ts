import styled from 'styled-components'
import theme from '../../../../styles/theme'

export const InputStyled = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  outline: 0;
  background: transparent;
  border: 1px solid ${theme.colors.mainBg};
  color: ${theme.colors.contrastText};
  padding: 0 10px;
  font-size: 18px;
  margin: 10px 0;
`

export const TextAreaStyled = styled.textarea`
  width: 100%;
  height: 80px;
  display: flex;
  border-radius: 5px;
  outline: 0;
  background: transparent;
  border: 1px solid ${theme.colors.mainBg};
  color: ${theme.colors.contrastText};
  padding: 0 10px;
  font-size: 18px;
  margin: 10px 0;
`
