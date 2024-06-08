import React from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import FormQuestion from '../components/FormCreateQuiz/components/FormQuestion'
import FormQuiz from '../components/FormCreateQuiz/components/FormQuiz'
import FormTheme from '../components/FormCreateQuiz/components/FormTheme'
import Layout from '../components/Layout'
import { useQuiz } from '../hooks/Quiz'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`

const CreateQuizPage: React.FC = () => {
  const router = useRouter()

  const {
    quizContext: { step },
    setQuizContext,
  } = useQuiz()

  function goBack() {
    router.push('/')
    setQuizContext({
      idQuiz: undefined,
      step: undefined,
    })
  }

  return (
    <Layout padding={true}>
      <Container>
        {!step && <FormQuiz />}
        {step === 2 && <FormTheme />}
        {step === 3 && <FormQuestion handleGoBack={goBack} />}
      </Container>
    </Layout>
  )
}

export default CreateQuizPage

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['quiz-auth.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
