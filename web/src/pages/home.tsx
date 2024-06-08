import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import CardQuiz from '../components/CardQuiz'
import { ButtonStyled } from '../components/Button/styled'
import { getApiClient } from '../services/api'
import { FiEdit, FiTrash } from 'react-icons/fi'
import ReactLoading from 'react-loading'
import theme from '../styles/theme'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { ButtonNewQuizContainer, Container } from '../styles/pages/home.styled'

interface IPropsHome {
  quizes: any[] | null
}

const HomePage: React.FC<IPropsHome> = ({ quizes }) => {
  const router = useRouter()

  function handleSubmit(id: string) {
    return router.push(`quiz/?id=${id}`)
  }

  const toggleMenuItems = [
    {
      icon: <FiTrash size={20} />,
      text: 'Deletar',
      onclick: async (id: string) => {
        try {
          const api = getApiClient()

          await api.delete(`quiz/${id}`)

          router.push(`/home`)
        } catch (error) {
          alert(JSON.stringify({ err: error.message }))
        }
      },
    },
    {
      icon: <FiEdit size={20} />,
      text: 'Editar',
      onclick: async (id: string) => {
        try {
          router.push(`/update/${id}`)
        } catch (error) {
          alert(JSON.stringify({ err: error.message }))
        }
      },
    },
  ]

  return (
    <Layout padding={true}>
      <ButtonNewQuizContainer>
        <h1>Meus Quizzes</h1>
        <ButtonStyled onClick={() => router.push('/create-quiz')} width="160px">
          Novo quiz
        </ButtonStyled>
      </ButtonNewQuizContainer>
      <Container>
        {quizes ? (
          quizes.map(item => (
            <CardQuiz
              header={item.title}
              itemId={item.id}
              toggleItems={toggleMenuItems}
              background={item.img_bg_url}
            >
              <p>{item.title}</p>
              <span>{item.description}</span>

              <ButtonStyled onClick={() => handleSubmit(item.id)} type="button">
                Responda o quiz
              </ButtonStyled>
            </CardQuiz>
          ))
        ) : (
          <div className="loading">
            <ReactLoading
              color={theme.colors.secondary}
              type="spinningBubbles"
            />
          </div>
        )}
      </Container>
    </Layout>
  )
}

export default HomePage

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

  const response = await api('quiz/user')

  return {
    props: {
      quizes: response.data,
    },
  }
}
