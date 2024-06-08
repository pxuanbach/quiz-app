import styled, { css } from 'styled-components'
import theme from '../../styles/theme'

export const CardQuizContent = styled.div`
  p.rightAnswer {
    margin-top: 20px;
    margin-bottom: 0;
  }
`

interface IAnswer {
  selected?: boolean
  answer: string | undefined
  themeCustom?: {
    primary?: string
    secondary?: string
    mainBg?: string
    contrastText?: string
    wrong?: string
    success?: string
  }
}

export const Answer = styled.div<IAnswer>`
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 10px 20px;
  ${({ answer, selected, themeCustom }) =>
    answer && selected
      ? css`
          background-color: ${answer};
        `
      : css`
          background-color: ${themeCustom
            ? themeCustom.contrastText
            : theme.colors.contrastText};
        `}
  color: ${props =>
    props.themeCustom ? props.themeCustom.primary : theme.colors.primary};
  width: 100%;
  margin-top: 15px;
  border: 0;
  outline: 0;
  font-weight: bold;
  ${({ selected }) =>
    selected
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0.5;
        `}

  &:hover {
    opacity: 1;
  }
`
