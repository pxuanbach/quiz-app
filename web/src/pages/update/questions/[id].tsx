import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React from 'react'
import { ButtonStyled } from '../../../components/Button/styled'
import CardForm from '../../../components/CardForm'
import Layout from '../../../components/Layout'
import { getApiClient } from '../../../services/api'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const UpdateQuestionPage: React.FC<{
  id: string
  data: any
}> = ({ data }) => {
  const router = useRouter()

  const deleteQuestion = async (id: string) => {
    try {
      const api = getApiClient()

      await api.delete(`question/${id}`)

      router.push(`/update/questions/${data.id}`)
    } catch (error) {
      alert(JSON.stringify({ err: error.message }))
    }
  }

  return (
    <Layout padding={true}>
      <Container>
        {
          <>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1>{data.title}</h1>
              <span>{data.description}</span>
            </div>
            {data.questions.map((item, index) => (
              <>
                <CardForm header={`Questão ${index + 1}`}>
                  <p>{item.title}</p>
                  <span>{item.description}</span>
                  <ButtonStyled
                    onClick={() =>
                      router.push(`/update/questions/update/${item.id}`)
                    }
                  >
                    Atualizar Questão
                  </ButtonStyled>
                  <ButtonStyled onClick={() => deleteQuestion(item.id)}>
                    Remover Questão
                  </ButtonStyled>
                </CardForm>
              </>
            ))}
          </>
        }
      </Container>
    </Layout>
  )
}

export default UpdateQuestionPage

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
      id: ctx.query.id,
      data,
    },
  }
}
