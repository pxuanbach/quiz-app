import React from 'react'
import { getApiClient } from '../../../services/api'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import router from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import Layout from '../../../components/Layout'
import CardForm from '../../../components/CardForm'
import { ButtonStyled } from '../../../components/Button/styled'
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
`

type FormUpdateThemeInputs = {
  primary: string
  mainBg: string
  wrong: string
  success: string
  contrastText: string
  secondary: string
}

const UpadateThemePage: React.FC<{
  data: any
}> = ({ data }) => {
  const { handleSubmit, register, reset } = useForm({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<FormUpdateThemeInputs> = async ({
    primary,
    mainBg,
    wrong,
    success,
    contrastText,
    secondary,
  }) => {
    try {
      const api = getApiClient()

      await api.put(`themeQuiz/${data.id}`, {
        primary,
        mainBg,
        wrong,
        success,
        contrastText,
        secondary,
      })

      router.back()
      reset()
    } catch (error) {
      return alert(JSON.stringify({ err: error.message, id: data.id }))
    }
  }

  return (
    <Layout padding={true}>
      <Container>
        <CardForm header="Crie o tema do quiz">
          <form key={2} onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('primary', { required: true })}
              placeholder="Cor primária"
              defaultValue={data.primary}
            />
            <input
              {...register('secondary', { required: true })}
              placeholder="Cor secondaria"
              defaultValue={data.secondary}
            />
            <input
              {...register('mainBg', { required: true })}
              placeholder="Cor de fundo"
              defaultValue={data.mainBg}
            />
            <input
              {...register('contrastText', { required: true })}
              placeholder="Cor de contraste do texto"
              defaultValue={data.contrastText}
            />
            <input
              {...register('success', { required: true })}
              placeholder="Cor de sucesso"
              defaultValue={data.success}
            />
            <input
              {...register('wrong', { required: true })}
              placeholder="Cor de erro"
              defaultValue={data.wrong}
            />
            <ButtonStyled type="submit">Atualizar tema</ButtonStyled>
          </form>
        </CardForm>
      </Container>
    </Layout>
  )
}

export default UpadateThemePage

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

  const response = await api.get(`/themeQuiz/${ctx.query.id}`)

  const data = response.data

  return {
    props: {
      id: ctx.query.id,
      data,
    },
  }
}
