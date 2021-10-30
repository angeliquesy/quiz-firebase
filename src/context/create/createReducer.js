import {CREATE_QUIZ, CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "../types";
import {reducerHandler} from '../helpers'

const handlers = {
  [CREATE_QUIZ]: (state, {name, createdBy}) => ({...state, quiz: {...state.quiz, name, createdBy}}),
  [CREATE_QUIZ_QUESTION]: (state, {item}) => ({...state, quiz: {...state.quiz, questions: [...state.quiz.questions, item]}}),
  [RESET_QUIZ_CREATION]: (state) => ({...state, quiz: {name: '', createdBy: '', questions: []}}),
  DEFAULT: state => state
}

export const createReducer = reducerHandler(handlers)
