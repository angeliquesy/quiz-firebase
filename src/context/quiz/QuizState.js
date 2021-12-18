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
import React, { useReducer } from 'react'
import { quizReducer } from './quizReducer'
import { QuizContext } from './quizContext'
import { triviaIds } from '../../constants/triviaIds'
import { db } from '../../constants/db-paths'

export const QuizState = ({ children }) => {

  const initialState = {
    quizzes: [],
    loading: true,
    error: null,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: null,
  }

  const [state, dispatch] = useReducer(quizReducer, initialState)

  const token = localStorage.getItem('token')

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
    const storage = localStorage.getItem('deleted') || ''

    if (storage !== id)
      localStorage.setItem('deleted', storage + ' ' + id)

    dispatch({
      type: DELETE_QUIZ,
      payload: newQuizzes
    })

    await axios.delete(`${db.quizzes}/${id}.json?auth=${token}`)
  }

  const fetchQuizById = async quizId => {
    fetchQuizzesStart()

    try {
      const response = await axios.get(`${db.quizzes}/${quizId}.json`)
      const quiz = response.data

      for (let i of triviaIds) {
        if (quizId === i) {
          quiz.questions = quiz.questions.sort(() => 0.5 - Math.random()).slice(0, 10)
        }
      }

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

    const question = state.quiz.questions[state.activeQuestion]
    const results = state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      quizSetState({[answerId]: 'success'}, results)

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          finishQuiz()
        }
    else {
          quizNextQuestion(state.activeQuestion + 1)
        }
        window.clearTimeout(timeout)
      }, 1000)
    }
    else {
      results[question.id] = 'error'
      quizSetState({[answerId]: 'error'}, results)
    }
  }

  const isQuizFinished = state => {
    return state.activeQuestion + 1 === state.quiz.questions.length
  }

  const fetch = async () => {
    fetchQuizzesStart()

    try {
      const deleted = localStorage.getItem('deleted')

      if (deleted) {
        console.log(deleted)
        deleted.split(' ').forEach(i => deleteQuiz(i))
      }

      localStorage.removeItem('deleted')

      const response = await axios.get(`${db.quizzes}.json`)

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
      fetch, state, error: state.error,
      fetchQuizById, fetchQuizSuccess, quizSetState, finishQuiz, retryQuiz,
      quizAnswerClick, quizNextQuestion,
      clearLoading: () => fetchQuizzesStart()
    }}>
      {children}
    </QuizContext.Provider>
  )
}


