import {AUTH_SUCCESS, AUTH_LOGOUT, GET_USER, EDIT_USER, AUTH_ERROR} from '../types'
import {reducerHandler} from '../helpers'

const handlers = {
  [AUTH_SUCCESS]: (state, {token, id}) => ({...state, token, id}),
  [AUTH_ERROR]: (state, {error}) => ({...state, error}),
  [AUTH_LOGOUT]: (state) => ({...state, user: {favs: []}, id: null, token: null}),
  [GET_USER]: (state, {user}) => ({...state, user}),
  [EDIT_USER]: (state, {payload}) => ({...state, user: {...state.user, favs: payload}}),
  DEFAULT: state => state
}

export const authReducer = reducerHandler(handlers)
