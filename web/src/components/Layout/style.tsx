import styled, { css } from 'styled-components'
import theme from '../../styles/theme'

interface IBackgroundProps {
  background?: string
  padding?: boolean
}

export const Background = styled.div<IBackgroundProps>`
  background: #0f0c29;
  ${props =>
    props.background
      ? css`
          background-image: url(${({ background }: { background: string }) =>
            background});
        `
      : css`
          background: #24243e; /* fallback for old browsers */
          background: -webkit-linear-gradient(
            to right,
            #24243e,
            #1e2343,
            #24243e
          ); /* Chrome 10-25, Safari 5.1-6 */
          background: linear-gradient(
            to right,
            #24243e,
            #1e2343,
            #24243e
          ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7*/
        `}

  font-size: 16px;
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: fixed;
  width: 100%;
  margin: 0 auto;

  > div {
    max-width: 1140px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: left;
    ${props =>
      props.padding &&
      css`
        padding: 80px 20px;
      `}
  }
`
