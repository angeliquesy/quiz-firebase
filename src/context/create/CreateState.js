import { CREATE_QUIZ, CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from '../types'
import axios from '../../axios/axios-quiz'
import React, {useReducer, useContext} from 'react'
import { createReducer } from './createReducer'
import { CreateContext } from './createContext'
import { AuthContext } from '../auth/authContext'
import { db } from '../../constants/db-paths'

export const CreateState = ({ children }) => {
  const initialState = {
    quiz: {
      name: '',
      createdBy: '',
      questions: []
    }
  }

  const [state, dispatch] = useReducer(createReducer, initialState)

  const {token} = useContext(AuthContext)

  const createQuiz = (name, createdBy) => {
    dispatch({
      type: CREATE_QUIZ,
      name, createdBy
    })
  }

  const createQuizQuestion = item => {
    dispatch({
      type: CREATE_QUIZ_QUESTION,
      item
    })
  }

  const resetQuizCreation = () => dispatch({type: RESET_QUIZ_CREATION})

  const finishCreateQuiz = async () => {
    try {
      await axios.post(`${db.quizzes}.json?auth=${token}`, state.quiz)
      resetQuizCreation()

      return 'success'
    }
    catch (e) {
      return false
    }
  }

  return (
    <CreateContext.Provider value={{
      createQuiz, createQuizQuestion, finishCreateQuiz, quiz: state.quiz, error: !!state.error
    }}>
      {children}
    </CreateContext.Provider>
  )
}


