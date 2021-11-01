import {AUTH_SUCCESS, AUTH_LOGOUT, GET_USER} from "../types";
import {reducerHandler} from '../helpers'

const handlers = {
  [AUTH_SUCCESS]: (state, {token, id}) => ({...state, token, id}),
  [AUTH_LOGOUT]: (state) => ({...state, user: null, id: null, token: null}),
  [GET_USER]: (state, {user}) => ({...state, user}),
  DEFAULT: state => state
}

export const authReducer = reducerHandler(handlers)
