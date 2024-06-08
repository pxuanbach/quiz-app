import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getApiClient } from '../../../../services/api'
import { useQuiz } from '../../../../hooks/Quiz'
import { TextAreaStyled, InputStyled } from './styles'
import CardForm from '../../../../components/CardForm'
import { ButtonStyled } from '../../../../components/Button/styled'

type FormCreateQuizInputs = {
  title: string
  description: string
  img_bg_url: string
}

const FormQuiz: React.FC = () => {
  const { setQuizContext } = useQuiz()

  const { handleSubmit, register, reset } = useForm({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<FormCreateQuizInputs> = async ({
    title,
    description,
    img_bg_url,
  }) => {
    try {
      const api = getApiClient()

      const response = await api.post('quiz', {
        title,
        description,
        img_bg_url,
      })

      const { id } = response.data

      setQuizContext({
        idQuiz: id,
        step: 2,
      })

      reset()
    } catch (error) {
      console.log(error)
      return alert(JSON.stringify(error.message))
    }
  }

  return (
    <CardForm header="Adicione um novo quiz">
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <InputStyled
          {...register('title', { required: true })}
          placeholder="Titulo"
        />
        <InputStyled
          {...register('img_bg_url', { required: true })}
          placeholder="URL da imagem de fundo"
        />
        <TextAreaStyled
          {...register('description', { required: true })}
          placeholder="Descrição"
        ></TextAreaStyled>
        <ButtonStyled type="submit">Criar quiz</ButtonStyled>
      </form>
    </CardForm>
  )
}

export default FormQuiz
