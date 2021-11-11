import React, {useReducer} from 'react'
import axios from 'axios'
import axiosDb from '../../axios/axios-quiz'
import { AUTH_LOGOUT, AUTH_SUCCESS, GET_USER, EDIT_USER, AUTH_ERROR } from '../types'
import { authReducer } from './authReducer'
import { AuthContext } from './authContext'
import { db } from '../../constants/db-paths'

const withCreds = query => `https://identitytoolkit.googleapis.com/v1/accounts:${query}?key=AIzaSyCPg1ppEmNlVms9f4WAtq56AjuAfLLRUOY`

export const AuthState = ({ children }) => {
  const initialState = {
    token: null,
    user: {
      favs: []
    },
    id: null,
    error: null
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  const autoLogout = time => {
    setTimeout(() => {
      logout()
    }, time * 1000)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')

    dispatch({
      type: AUTH_LOGOUT
    })
  }

  const autoLogin = () => {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('userId')

    if (!id) {
      logout()
    } 
    else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        logout()
      } 
      else {
        authSuccess(token, id)
        autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
      }
    }
  }

  const authSuccess = (token, id) => {
    dispatch({
      type: AUTH_SUCCESS,
      token, id
    })
  }

  const authError = error => {
    dispatch({
      type: AUTH_ERROR,
      error
    })
  }

  const auth = async (email, password, isLogin) => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    const url = isLogin
      ? withCreds('signInWithPassword')
      : withCreds('signUp')

    let response

    try {
      response = await axios.post(url, authData)
    }
    catch(e) {
      authError(isLogin ? 'signIn' : 'signUp')
    }

    if (!response) return

    const { localId, expiresIn, refreshToken } = response.data

    const secureResponse = await axios.post(
      'https://securetoken.googleapis.com/v1/token?key=AIzaSyCPg1ppEmNlVms9f4WAtq56AjuAfLLRUOY',
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      }
    )

    const token = secureResponse.data.access_token
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)

    localStorage.setItem('token', token)
    localStorage.setItem('userId', localId)
    localStorage.setItem('expirationDate', expirationDate)

    getUser()
    authSuccess(token, localId)
    autoLogout(expiresIn)
  }

  const addUser = async (token, id) => {
    await axiosDb.put(`${db.users}/${id}.json?auth=${token}`, {quizzes: 1})
  }

  const getUser = async () => {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('userId')

    if (!token) return

    const response = await axiosDb.get(`${db.users}/${id}.json?auth=${token}`)

    if (response.data) {
      dispatch({
        type: GET_USER,
        user: response.data
      })

    } 
    else {
      addUser(token, id)
      getUser()
    }
  }

  const toggleFav = async quizId => {
    let favs = []

    if (state.user && state.user.favs && state.user.favs.length) {
      favs = state.user.favs

      if (favs.some(i => i === quizId)) {
        favs = favs.filter(i => i !== quizId)
      }
      else {
        favs.push(quizId)
      }
    }
    else {
      favs.push(quizId)
    }

    dispatch({
      type: EDIT_USER,
      payload: favs
    })

    await axiosDb.put(`${db.users}/${id}/favs.json?auth=${token}`, favs)
  }

  const { token, user, id, error } = state

  return (
    <AuthContext.Provider value={{
      autoLogin, auth, autoLogout, authSuccess, logout, getUser,
      isAuthenticated: !!id, user, token, userId: id, toggleFav, error
    }}>
      {children}
    </AuthContext.Provider>
  )


}


