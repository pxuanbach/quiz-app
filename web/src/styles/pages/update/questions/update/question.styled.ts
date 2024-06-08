import styled from 'styled-components'
import theme from '../../../../theme'

interface IPropsCreateQuiz {
  indexRightAnswer?: number
}

export const Container = styled.div<IPropsCreateQuiz>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  input {
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
  }

  textarea {
    width: 100%;
    height: 80px;
    border-radius: 5px;
    outline: 0;
    background: transparent;
    border: 1px solid ${theme.colors.mainBg};
    color: ${theme.colors.contrastText};
    padding: 0 10px;
    font-size: 18px;
    margin: 10px 0;
  }

  button.moreOptions {
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
  }

  div.options {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    > input {
      width: 68%;
      margin-right: 15px;
    }

    > div {
      display: flex;
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
  }
`
