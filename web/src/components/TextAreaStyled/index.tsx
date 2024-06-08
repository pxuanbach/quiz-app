import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/theme'
import { HtmlHTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'

export const TextAreaContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  border: 1px solid ${theme.colors.mainBg};
  margin: 15px 0;
  border-radius: 5px;

  & + div {
    margin-top: 30px !important;
  }

  textarea {
    padding: 10px;
    height: 80px;
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

interface IPropstTextArea extends HtmlHTMLAttributes<HTMLTextAreaElement> {
  Icon?: IconType
}

const InputStyled: React.FC<IPropstTextArea> = ({ ...rest }) => {
  return (
    <TextAreaContainer>
      <textarea {...rest} />
    </TextAreaContainer>
  )
}

export default InputStyled
