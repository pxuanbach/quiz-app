import { Box, MenuItem } from '@material-ui/core'
import styled, { css } from 'styled-components'
import theme from '../../styles/theme'

interface IPropsCardQuiz {
  background?: string
  themeCustom?: {
    primary?: string
    secondary?: string
    mainBg?: string
    contrastText?: string
    wrong?: string
    success?: string
  }
}

export const Container = styled(Box)<IPropsCardQuiz>`
  background-color: ${props =>
    props.themeCustom ? props.themeCustom.primary : theme.colors.primary};
  margin-bottom: 20px;

  color: ${props =>
    props.themeCustom
      ? props.themeCustom.contrastText
      : theme.colors.contrastText};
  border-radius: 5px;
  width: 350px;

  @media (max-width: 760px) {
    width: 100%;
  }

  ${props =>
    props.background &&
    css`
      > div.img-cover {
        background: url(${props.background});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 150px;
      }
    `}

  div.content {
    border: 1px solid
      ${props =>
        props.themeCustom ? props.themeCustom.mainBg : theme.colors.mainBg};
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

interface IPropsHeaderQuiz {
  themeCustom?: {
    primary?: string
    secondary?: string
    mainBg?: string
    contrastText?: string
    wrong?: string
    success?: string
  }
}

export const HeaderCardQuiz = styled.div<IPropsHeaderQuiz>`
  background-color: ${props =>
    props.themeCustom ? props.themeCustom.mainBg : theme.colors.mainBg};
  padding: 0px 25px;
  font-weight: bold;
  display: flex;
  align-items: center;

  > p {
    padding: 18px 0;
    opacity: 0.8;
    color: ${props =>
      props.themeCustom ? props.themeCustom.primary : theme.colors.primary};

    flex: 1;
  }

  button {
    svg {
      color: ${props =>
        props.themeCustom
          ? props.themeCustom.contrastText
          : theme.colors.contrastText};
    }
  }
`

export const MenuItemStyled = styled(MenuItem)`
  margin-bottom: 20px;

  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`
