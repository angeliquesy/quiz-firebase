import axios from '../../axios/axios-quiz'
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
  DELETE_QUIZ,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
  QUIZ_SET_STATE
} from '../types'
import React, {useReducer} from 'react'
import {quizReducer} from './quizReducer'
import {QuizContext} from './quizContext'

export const QuizState = ({children}) => {

  const initialState = {
    quizzes: [],
    loading: true,
    error: null,
    results: {}, // { [id]: 'success' 'error'}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' 'error'}
    quiz: null,
  }

  const [state, dispatch] = useReducer(quizReducer, initialState)

  const fetchQuizzesStart = () => dispatch({type: FETCH_QUIZZES_START})

  const fetchQuizzesSuccess = quizzes => dispatch({
    type: FETCH_QUIZZES_SUCCESS,
    payload: quizzes
  })

  const fetchQuizzesError = e => dispatch({
    type: FETCH_QUIZZES_ERROR,
    payload: e
  })

  const deleteQuiz = async id => {
    const newQuizzes = state.quizzes.filter(quiz => quiz.id !== id)
    await axios.delete(`quizes/${id}.json`)

    console.log(newQuizzes)

    dispatch({
      type: DELETE_QUIZ,
      payload: newQuizzes
    })
  }

  const fetchQuizById = async quizId => {
    fetchQuizzesStart()

    try {
      const response = await axios.get(`quizes/${quizId}.json`)
      const quiz = response.data

      fetchQuizSuccess(quiz)
    } catch (e) {
      fetchQuizzesError(e)
    }
  }

  const fetchQuizSuccess = quiz => dispatch({
    type: FETCH_QUIZ_SUCCESS,
    quiz
  })

  const quizSetState = (answerState, results) => {
    dispatch({
      type: QUIZ_SET_STATE,
      answerState, results
    })
  }

  const finishQuiz = () => dispatch({type: FINISH_QUIZ})

  const quizNextQuestion = number => dispatch({
    type: QUIZ_NEXT_QUESTION,
    number
  })

  const retryQuiz = () => dispatch({type: QUIZ_RETRY})

  const quizAnswerClick = answerId => {
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key] === 'success') return;
    }

    const question = state.quiz[state.activeQuestion]
    const results = state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      quizSetState({[answerId]: 'success'}, results)

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          finishQuiz()
        } else {
          quizNextQuestion(state.activeQuestion + 1)
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'
      quizSetState({[answerId]: 'error'}, results)
    }
  }

  const isQuizFinished = state => {
    return state.activeQuestion + 1 === state.quiz.length
  }

  const fetch = async () => {
    fetchQuizzesStart()
    try {
      const response = await axios.get('quizes.json')

      const quizzes = []

      for (const [key, value] of Object.entries(response.data)) {
        quizzes.push({
          id: key,
          name: value.name || 'Тест',
          createdBy: value.createdBy || null
        })
      }

      fetchQuizzesSuccess(quizzes)
    } catch (e) {
      fetchQuizzesError(e)
    }
  }

  return (
    <QuizContext.Provider value={{
      fetchQuizzesStart, fetchQuizzesSuccess, fetchQuizzesError, deleteQuiz,
      fetch, state,
      fetchQuizById, fetchQuizSuccess, quizSetState, finishQuiz, retryQuiz,
      quizAnswerClick, quizNextQuestion,
      clearLoading: () => fetchQuizzesStart()
    }}>
      {children}
    </QuizContext.Provider>
  )
}


