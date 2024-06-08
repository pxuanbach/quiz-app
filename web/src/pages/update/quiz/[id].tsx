import { GetServerSideProps } from 'next'
import router from 'next/router'
import { parseCookies } from 'nookies'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ButtonStyled } from '../../../components/Button/styled'
import CardForm from '../../../components/CardForm'
import Layout from '../../../components/Layout'
import { getApiClient } from '../../../services/api'
import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Container = styled.div`
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
`

type FormUpdateQuizInputs = {
  title: string
  description: string
  img_bg_url: string
}

const UpdateQuizPage: React.FC<{
  id: string
  data: any
}> = ({ data }) => {
  const { handleSubmit, register } = useForm({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<FormUpdateQuizInputs> = async ({
    title,
    img_bg_url,
    description,
  }) => {
    try {
      const api = getApiClient()

      await api.put(`quiz/${data.id}`, {
        title,
        description,
        img_bg_url,
      })

      router.back()
    } catch (error) {
      return console.log(error)
    }
  }

  return (
    <Layout padding={true}>
      <Container>
        <CardForm header="Adicione um novo quiz">
          <form key={1} onSubmit={handleSubmit(onSubmit)} action="">
            <input
              {...register('title_quiz', { required: true })}
              placeholder="Titulo"
              defaultValue={data.title}
            />
            <input
              {...register('img_bg_url', { required: true })}
              placeholder="URL da imagem de fundo"
              defaultValue={data.img_bg_url}
            />
            <textarea
              {...register('description_quiz', { required: true })}
              placeholder="Descrição"
              defaultValue={data.description}
            />
            <ButtonStyled type="submit">Atualizar quiz</ButtonStyled>
          </form>
        </CardForm>
      </Container>
    </Layout>
  )
}

export default UpdateQuizPage

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
