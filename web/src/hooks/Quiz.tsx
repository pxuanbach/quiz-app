import React, { createContext, useState, useContext } from 'react'

interface IStateContext {
  quizContext: ContextValue
  setQuizContext: React.Dispatch<React.SetStateAction<ContextValue>>
}

type ContextValue = {
  step: number
  idQuiz: string | undefined
}

const defaultValue = {
  step: undefined,
  idQuiz: undefined,
}

const QuizContext = createContext({} as IStateContext)

const QuizProvider: React.FC = ({ children }) => {
  const [quizContext, setQuizContext] = useState<ContextValue>(defaultValue)

  return (
    <QuizContext.Provider value={{ quizContext, setQuizContext }}>
      {children}
    </QuizContext.Provider>
  )
}

const useQuiz = () => {
  const context = useContext(QuizContext)

  if (!context) {
    throw new Error('useQuiz must be use within an QuizProvider')
  }

  return context
}

export { QuizProvider, useQuiz }
