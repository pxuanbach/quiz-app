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

export const ButtonMoreOption = styled.button`
  background: transparent;
  display: flex;
  align-items: center;
  height: 40px;
  margin-top: 10px;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  border: 0;
  font-size: 16px;
  font-weight: bold;

  svg {
    margin-right: 10px;
  }
`

export const OptionsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;

  div {
    display: flex;
    margin-left: 15px;
    justify-content: space-between;

    button {
      background-color: transparent;
      border: 0;

      &:first-child {
        margin-right: 20px;
      }

      svg {
        color: ${theme.colors.secondary};
        font-weight: bold;
      }

      &:hover {
        svg {
          color: ${theme.colors.success};
        }
      }
    }
  }
`
