import React from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import CardForm from '../../components/CardForm'
import { ButtonStyled } from '../../components/Button/styled'
import { getApiClient } from '../../services/api'
import { useQuiz } from '../../hooks/Quiz'
import FormQuestion from '../../components/FormCreateQuiz/components/FormQuestion'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export const Container = styled.div<{
  indexRightAnswer?: number
}>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const UpdateQuiz: React.FC<{
  data: any
}> = ({ data }) => {
  const router = useRouter()
  const { setQuizContext, quizContext } = useQuiz()

  return (
    <Layout padding={true}>
      <Container>
        {!quizContext.idQuiz ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1>{data.title}</h1>
              <span>{data.description}</span>
            </div>
            <CardForm header="Atualizar o quiz!">
              <ButtonStyled
                onClick={() => router.push(`/update/quiz/${router.query.id}`)}
              >
                Atualizar Quiz
              </ButtonStyled>
            </CardForm>
            <CardForm header="Atualizar o tema">
              <ButtonStyled
                onClick={() => router.push(`/update/theme/${data.theme.id}`)}
              >
                Atualizar Tema
              </ButtonStyled>
            </CardForm>
            <CardForm header="Atualizar o questões">
              <ButtonStyled
                onClick={() => router.push(`/update/questions/${data.id}`)}
              >
                Atualiazar questões
              </ButtonStyled>
            </CardForm>
            <CardForm header="Adicionar mais questões">
              <ButtonStyled
                onClick={() =>
                  setQuizContext({
                    idQuiz: data.id,
                    step: undefined,
                  })
                }
              >
                Adicionar mais questões
              </ButtonStyled>
            </CardForm>
          </>
        ) : (
          <FormQuestion
            handleGoBack={() =>
              setQuizContext({
                idQuiz: undefined,
                step: undefined,
              })
            }
          />
        )}
      </Container>
    </Layout>
  )
}

export default UpdateQuiz

export const getServerSideProps: GetServerSideProps = async ctx => {
  const api = getApiClient(ctx)

  const { ['quiz-auth.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const response = await api.get(`/quiz/${ctx.query.id}`)

  const data = response.data

  return {
    props: {
      data,
    },
  }
}
