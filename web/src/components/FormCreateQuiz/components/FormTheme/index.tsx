import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getApiClient } from '../../../../services/api'
import { useQuiz } from '../../../../hooks/Quiz'
import { UTILS } from '../../../../constants/utils'
import styled from 'styled-components'
import theme from '../../../../styles/theme'
import CardForm from '../../../../components/CardForm'
import { ButtonStyled } from '../../../../components/Button/styled'

const InputStyled = styled.input`
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
`

type FormThemeInputs = {
  primary: string
  mainBg: string
  wrong: string
  success: string
  contrastText: string
  secondary: string
}

const FormTheme: React.FC = () => {
  const {
    quizContext: { idQuiz },
    quizContext,
    setQuizContext,
  } = useQuiz()

  const { handleSubmit, register, reset } = useForm({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<FormThemeInputs> = async ({
    primary,
    mainBg,
    wrong,
    success,
    contrastText,
    secondary,
  }) => {
    try {
      const api = getApiClient()

      const response = await api.post('themeQuiz', {
        primary,
        mainBg,
        wrong,
        success,
        contrastText,
        secondary,
      })

      const { id } = response.data

      await api.patch(`quiz/${idQuiz}`, {
        themeId: id,
      })

      setQuizContext({
        ...quizContext,
        step: 3,
      })
      reset()
    } catch (error) {
      return alert(JSON.stringify(error.message))
    }
  }

  return (
    <CardForm header="Crie o tema do quiz">
      <form key={2} onSubmit={handleSubmit(onSubmit)}>
        <InputStyled
          {...register('primary', { required: true })}
          placeholder="Cor primária"
          defaultValue={UTILS.theme.colors.primary}
        />
        <InputStyled
          {...register('secondary', { required: true })}
          placeholder="Cor secondaria"
          defaultValue={UTILS.theme.colors.secondary}
        />
        <InputStyled
          {...register('mainBg', { required: true })}
          placeholder="Cor de fundo"
          defaultValue={UTILS.theme.colors.mainBg}
        />
        <InputStyled
          {...register('contrastText', { required: true })}
          placeholder="Cor de contraste do texto"
          defaultValue={UTILS.theme.colors.contrastText}
        />
        <InputStyled
          {...register('success', { required: true })}
          placeholder="Cor de sucesso"
          defaultValue={UTILS.theme.colors.success}
        />
        <InputStyled
          {...register('wrong', { required: true })}
          placeholder="Cor de erro"
          defaultValue={UTILS.theme.colors.wrong}
        />
        <ButtonStyled type="submit">Criar tema</ButtonStyled>
      </form>
    </CardForm>
  )
}

export default FormTheme
