import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.contrastText};
  margin-bottom: 20px;
  border-radius: 5px;
  width: 450px;

  @media (max-width: 760px) {
    width: 100%;
  }

  div.content {
    border: 1px solid ${theme.colors.mainBg};
    border-top: transparent;
    padding: 25px;

    > p {
      font-weight: bold;
      margin-bottom: 20px;
    }

    span {
      opacity: 0.5;
    }
  }
`

export const HeaderStyled = styled.div`
  background-color: ${theme.colors.mainBg};
  padding: 0px 25px;
  font-weight: bold;
  display: flex;
  align-items: center;

  > p {
    padding: 18px 0;
    opacity: 0.8;
    color: ${theme.colors.primary};
    flex: 1;
  }

  button {
    svg {
      color: ${theme.colors.contrastText};
    }
  }
`
