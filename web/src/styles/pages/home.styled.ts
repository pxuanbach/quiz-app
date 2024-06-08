import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 480px) {
    justify-content: center;
  }

  div.loading {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    justify-self: center;
  }

  @media (max-width: 760px) {
    justify-content: center;
  }
`

export const ButtonNewQuizContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin: 40px 0;

  h1 {
    flex: 1;
    font-size: 28px;
  }

  button {
    margin: 0;
  }

  @media (max-width: 760px) {
    flex-direction: column;

    h1 {
      margin: 30px 0;
    }
  }
`
