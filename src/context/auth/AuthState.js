import React, {useReducer} from 'react'
import axios from 'axios'
import axiosDb from '../../axios/axios-quiz'
import {AUTH_LOGOUT, AUTH_SUCCESS, GET_USER} from '../types'
import {authReducer} from './authReducer'
import {AuthContext} from './authContext'

const withCreds = query => `https://identitytoolkit.googleapis.com/v1/accounts:${query}?key=AIzaSyCPg1ppEmNlVms9f4WAtq56AjuAfLLRUOY`

export const AuthState = ({children}) => {
  const initialState = {
    token: null,
    user: null,
    id: null
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  const autoLogout = time => {
    setTimeout(() => {
      logout()
    }, time * 1000)
  }

  const logout = () => {
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
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        logout()
      } else {
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

  const auth = async (email, password, isLogin) => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    const url = isLogin
      ? withCreds('signInWithPassword')
      : withCreds('signUp')

    const response = await axios.post(url, authData)
    const {localId, expiresIn, refreshToken} = response.data

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

    getUser(token, localId)
    authSuccess(token, localId)
    autoLogout(expiresIn)
  }

  const addUser = async (token, id) => {
    await axiosDb.put(`users/${id}.json?auth=${token}`, {quizzes: 1})
  }

  const getUser = async (token, id) => {
    const response = await axiosDb.get(`users/${id}.json`)

    if (response.data) {
      dispatch({
        type: GET_USER,
        user: response.data
      })
    }
    else {
      addUser(token, id)
      getUser(token, id)
    }
  }

  const {token, user, id} = state

  return (
    <AuthContext.Provider value={{
      autoLogin, auth, autoLogout, authSuccess, logout, getUser,
      isAuthenticated: !!id, user, token, userId: id
    }}>
      {children}
    </AuthContext.Provider>
  )


}


