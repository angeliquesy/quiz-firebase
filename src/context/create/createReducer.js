import {CREATE_QUIZ, CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "../types";
import {reducerHandler} from '../helpers'

const handlers = {
  [CREATE_QUIZ]: (state, {name, createdBy}) => ({...state, quiz: {name, createdBy, questions: [...state.quiz.questions]}}),
  [CREATE_QUIZ_QUESTION]: (state, {item}) => ({...state, quiz: {...state.quiz, questions: [...state.quiz.questions, item]}}),
  [RESET_QUIZ_CREATION]: (state) => ({...state, quiz: {}}),
  DEFAULT: state => state
}

export const createReducer = reducerHandler(handlers)
