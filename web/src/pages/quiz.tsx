import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import CardQuiz from '../components/CardQuiz'
import { Answer, CardQuizContent } from '../styles/pages/quiz.styled'
import { ButtonStyled } from '../components/Button/styled'
import { useEffect } from 'react'
import { UTILS } from '../constants/utils'

const QuizPage: React.FC<{
  user: string
  data: any
}> = ({ user, data }) => {
  const router = useRouter()
  const [dataQuiz, setDataQuiz] = useState(undefined)
  const [selected, setSelected] = useState<number>(undefined)
  const [answer, setAnswer] = useState(undefined)
  const [question, setQuestion] = useState(0)
  const [rightAnswer, setRightAnser] = useState(0)

  const questions = dataQuiz && dataQuiz.questions[question]

  const indexRightAnswer =
    questions &&
    dataQuiz.questions[question].alternatives.findIndex(
      item => item === dataQuiz.questions[question].answer
    )

  function handleAnswerConfirm() {
    setAnswer(
      selected === indexRightAnswer
        ? UTILS.theme.colors.success
        : UTILS.theme.colors.wrong
    )

    selected === indexRightAnswer && setRightAnser(state => state + 1)

    question !== dataQuiz.questions.length &&
      setTimeout(() => {
        setQuestion(state => state + 1)
        setAnswer(undefined)
        setSelected(undefined)
      }, 1000)
  }

  useEffect(() => {
    data.questions.length > 0 && setDataQuiz(data)
  }, [])

  return (
    <>
      {dataQuiz ? (
        <Layout background={data.img_bg_url} padding={true}>
          <CardQuiz
            background={data.img_bg_url}
            header={
              question === dataQuiz.questions.length
                ? `Você acertou ${rightAnswer} de ${dataQuiz.questions.length}`
                : `< Pergunta ${question + 1} de ${dataQuiz.questions.length}`
            }
            theme={{
              primary: dataQuiz.theme.primary,
              mainBg: dataQuiz.theme.mainBg,
              wrong: dataQuiz.theme.wrong,
              success: dataQuiz.theme.success,
              contrastText: dataQuiz.theme.contrastText,
              secondary: dataQuiz.theme.secondary,
            }}
          >
            {question === dataQuiz.questions.length ? (
              <CardQuizContent>
                {rightAnswer > 3 ? (
                  <p>{`Parabéns ${user} você acertou ${rightAnswer}`}</p>
                ) : (
                  <p>{`Você acertou apenas ${rightAnswer}`}</p>
                )}
                <ButtonStyled
                  onClick={() => router.push('/')}
                  color={dataQuiz.theme.contrastText}
                  background={dataQuiz.theme.secondary}
                >
                  Voltar para a home
                </ButtonStyled>
              </CardQuizContent>
            ) : (
              <>
                <CardQuizContent>
                  <p>{questions.title}</p>
                  <span>{questions.description}</span>
                  {questions.alternatives.map((item, index) => (
                    <Answer
                      selected={index === selected}
                      answer={answer && answer}
                      onClick={() => setSelected(answer ? selected : index)}
                    >
                      {item}
                    </Answer>
                  ))}

                  {answer && (
                    <>
                      {selected === indexRightAnswer ? (
                        <p className="rightAnswer">{`😃 você acertou!`}</p>
                      ) : (
                        <p className="rightAnswer">{`😞 você errou!`}</p>
                      )}
                    </>
                  )}

                  <ButtonStyled
                    onClick={handleAnswerConfirm}
                    color={dataQuiz.theme.contrastText}
                    background={dataQuiz.theme.secondary}
                  >
                    Confirmar
                  </ButtonStyled>
                </CardQuizContent>
              </>
            )}
          </CardQuiz>
        </Layout>
      ) : (
        <Layout background={data.img_bg_url} padding={true}>
          <CardQuiz
            background={data.bg_img_url}
            header="Este quiz não possui questões!"
          >
            <ButtonStyled onClick={() => router.push('/')}>
              Voltar para a home
            </ButtonStyled>
          </CardQuiz>
        </Layout>
      )}
    </>
  )
}

export default QuizPage

export async function getServerSideProps({
  query,
}: {
  query: {
    id: string
  }
}) {
  try {
    const response = await axios.get(`${UTILS.api}/quiz/${query.id}`)

    const data = response.data

    return {
      props: {
        user: query.id,
        data,
      },
    }
  } catch (error) {
    return {
      error: error.message,
    }
  }
}
