import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaCheck, FaPlus, FaTrash } from 'react-icons/fa'
import Loading from 'react-loading'
import { ButtonStyled } from '../../../../components/Button/styled'
import CardForm from '../../../../components/CardForm'
import Layout from '../../../../components/Layout'
import { useQuiz } from '../../../../hooks/Quiz'

import { getApiClient } from '../../../../services/api'
import theme from '../../../../styles/theme'
import { Container } from '../../../../styles/pages/update/questions/update/question.styled'

const QuestionQuizPage: React.FC<{ data: any }> = ({ data }) => {
  const router = useRouter()
  const { quizContext } = useQuiz()
  const [alternatives, setAlternatives] = useState(data.alternatives)
  const [option, setOption] = useState<string[]>(() => {
    return data.alternatives.map((item, index) => `option_${index}`)
  })
  const [indexRightAnswer, setIndexRightAnswer] = useState(
    data.alternatives.findIndex(item => item === data.answer)
  )
  const [rightAnswer, setRightAnswer] = useState(undefined)

  const { handleSubmit, register } = useForm({
    mode: 'onBlur',
  })

  function addMoreOption() {
    const lastItemArray = option[option.length - 1].split('_')

    const item = parseInt(lastItemArray[1])

    setOption([...option, `option_${item + 1}`])
  }

  const onSubmit = async dataQuestion => {
    try {
      const api = getApiClient()

      await api.put(`question/${data.id}`, {
        image_url:
          'https://thumbs.gfycat.com/IncredibleGrouchyEarwig-size_restricted.gif',
        title: dataQuestion.title_question,
        description: dataQuestion.description_question,
        answer: dataQuestion[rightAnswer],
        alternatives: option.map(item => dataQuestion[item]),
        quizId: quizContext.idQuiz,
      })

      router.back()
    } catch (error) {
      return alert(JSON.stringify({ err: error.message }))
    }
  }

  function handleRightAnswer(index: number) {
    setRightAnswer(`option_${index}`)
    setIndexRightAnswer(index)
  }

  function handleRemoveOption(item: string, index: number) {
    setOption(state =>
      state.length > 2
        ? state.filter(stateOption => stateOption !== item)
        : state
    )

    setAlternatives(state =>
      state.filter(
        stateAlternatives => stateAlternatives !== alternatives[index]
      )
    )
  }

  return (
    <Layout padding={true}>
      {data ? (
        <Container>
          <CardForm header="Atualizar questão!">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register('title_question', { required: true })}
                placeholder="Titulo"
                defaultValue={data.title}
              />
              <input
                {...register('description_question', {
                  required: true,
                })}
                placeholder="Descrição"
                defaultValue={data.description}
              />
              <div>
                {option.map((item, index) => (
                  <div className="options">
                    <input
                      {...register(`option_${index}` as any, {
                        required: true,
                      })}
                      placeholder={`Opção ${index + 1}`}
                      defaultValue={alternatives[index]}
                    />
                    <div>
                      <button
                        type="button"
                        onClick={() => handleRightAnswer(index)}
                      >
                        <FaCheck
                          size={25}
                          style={
                            index === indexRightAnswer
                              ? { color: theme.colors.success }
                              : {
                                  color: theme.colors.contrastText,
                                  opacity: '0.5',
                                }
                          }
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(item, index)}
                      >
                        <FaTrash
                          size={18}
                          style={{
                            color: theme.colors.contrastText,
                            opacity: '0.5',
                          }}
                        />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  style={{ color: theme.colors.contrastText }}
                  onClick={addMoreOption}
                  className="moreOptions"
                  type="button"
                >
                  <FaPlus size={20} />
                  adicionar opção
                </button>
              </div>
              <ButtonStyled type="submit">Atualizar questão</ButtonStyled>
            </form>
          </CardForm>
        </Container>
      ) : (
        <Loading />
      )}
    </Layout>
  )
}

export default QuestionQuizPage

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

  const response = await api.get(`/question/${ctx.query.id}`)

  const data = response.data

  return {
    props: {
      data,
    },
  }
}
