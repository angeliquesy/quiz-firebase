import {
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
} from '../types'
import {reducerHandler} from '../helpers'

const handlers = {
  [FETCH_QUIZZES_START]: (state) => ({...state, loading: true}),
  [FETCH_QUIZZES_SUCCESS]: (state, {payload}) => ({...state, loading: false, quizzes: payload}),
  [FETCH_QUIZZES_ERROR]: (state, {payload}) => ({...state, loading: false, error: payload}),

  [FETCH_QUIZ_SUCCESS]: (state, {quiz}) => ({...state, loading: false, quiz}),
  [QUIZ_SET_STATE]: (state, {answerState, results}) => ({...state, loading: false, answerState: answerState, results: results}),
  [FINISH_QUIZ]: (state) => ({...state, isFinished: true}),
  [QUIZ_NEXT_QUESTION]: (state, {number}) => ({...state, answerState: null, activeQuestion: number}),
  [QUIZ_RETRY]: (state) => ({...state, activeQuestion: 0, answerState: null, isFinished: false, results: {}}),
  DEFAULT: state => state
}

export const quizReducer = reducerHandler(handlers)
