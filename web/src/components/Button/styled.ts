import styled from 'styled-components'
import theme from '../../styles/theme'

interface IPropsButtonStyled {
  background?: string
  color?: string
  width?: string
}

export const ButtonStyled = styled.button<IPropsButtonStyled>`
  background-color: ${props =>
    props.background ? props.background : theme.colors.secondary};
  width: ${props => (props.width ? props.width : '100%')};
  color: ${props => (props.color ? props.color : theme.colors.contrastText)};
  height: 40px;
  border-radius: 5px;
  text-transform: uppercase;
  margin-top: 20px;
  border: 0;
  outline: 0;
  font-weight: bold;
  font-size: 16px;

  &:hover {
    opacity: 0.5;
  }
`
