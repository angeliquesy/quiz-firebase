import {AUTH_SUCCESS, AUTH_LOGOUT} from "../types";
import {reducerHandler} from '../helpers'

const handlers = {
  [AUTH_SUCCESS]: (state, {payload}) => ({...state, token: payload}),
  [AUTH_LOGOUT]: (state) => ({...state, token: null}),
  DEFAULT: state => state
}

export const authReducer = reducerHandler(handlers)
