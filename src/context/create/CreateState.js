import { CREATE_QUIZ, CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from '../types'
import axios from '../../axios/axios-quiz'
import React, {useReducer} from 'react'
import {createReducer} from './createReducer'
import {CreateContext} from './createContext'

export const CreateState = ({children}) => {
  const initialState = {
    quiz: {
      name: '',
      createdBy: '',
      questions: []
    }
  }

  const [state, dispatch] = useReducer(createReducer, initialState)

  const createQuiz = (name, createdBy) => {
    dispatch({
      type: CREATE_QUIZ,
      name, createdBy
    })
    console.log(name, createdBy)
  }

  const createQuizQuestion = item => {
    dispatch({
      type: CREATE_QUIZ_QUESTION,
      item
    })
  }

  const resetQuizCreation = () => dispatch({type: RESET_QUIZ_CREATION})

  const finishCreateQuiz = async () => {
    await axios.post('quizes.json', state.quiz)
    resetQuizCreation()
  }

  return (
    <CreateContext.Provider value={{
      createQuiz, createQuizQuestion, finishCreateQuiz, quiz: state.quiz
    }}>
      {children}
    </CreateContext.Provider>
  )
}


