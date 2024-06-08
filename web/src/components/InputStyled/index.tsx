import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/theme'
import { HtmlHTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  border: 1px solid ${theme.colors.mainBg};
  padding: 0 15px;
  margin: 15px 0;
  border-radius: 5px;

  & + div {
    margin-top: 30px !important;
  }

  > input {
    width: 100%;
    color: ${theme.colors.contrastText};
    border: 0;
    outline: 0;
    background: transparent;
    font-size: 18px;
  }

  svg {
    margin-right: 10px;
  }
`

interface IPropsInput extends HtmlHTMLAttributes<HTMLInputElement> {
  Icon?: IconType
  type?: string
}

const InputStyled: React.FC<IPropsInput> = ({
  type = 'text',
  Icon,
  ...rest
}) => {
  return (
    <InputContainer>
      {Icon && <Icon size={18} />}
      <input type={type} {...rest} />
    </InputContainer>
  )
}

export default InputStyled
