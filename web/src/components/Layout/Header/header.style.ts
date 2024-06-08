import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Container = styled.header`
  width: 100%;
  position: absolute;
  height: 100px;
  top: 0;

  @media (max-width: 760px) {
    padding: 0 30px;
  }

  > div {
    max-width: 960px;
    flex-direction: row;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    max-width: 1140px;
    margin: 0 auto;

    ul {
      display: flex;
      align-items: center;
      text-align: right;

      li {
        display: inline;
        padding: 0 15px;

        a {
          color: ${theme.colors.contrastText};
          text-decoration: none;
          display: flex;
          align-items: center;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
`
