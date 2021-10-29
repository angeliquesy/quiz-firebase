import React, {useReducer} from 'react'
import axios from 'axios'
import axiosDb from '../../axios/axios-quiz'
import {AUTH_LOGOUT, AUTH_SUCCESS, GET_USER} from '../types'
import {authReducer} from './authReducer'
import {AuthContext} from './authContext'

const withCreds = query => `https://identitytoolkit.googleapis.com/v1/accounts:${query}?key=AIzaSyCPg1ppEmNlVms9f4WAtq56AjuAfLLRUOY`

export const AuthState = ({children}) => {
  const initialState = {
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
    const id = localStorage.getItem('userId')

    if (!id) {
      logout()
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        logout()
      } else {
        authSuccess(id)
        autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
      }
    }
  }

  const authSuccess = id => {
    dispatch({
      type: AUTH_SUCCESS,
      id
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
    const {localId, expiresIn} = response.data

    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)

    if (!isLogin) {
      await addUser(localId, email)
    }

    localStorage.setItem('userId', localId)
    localStorage.setItem('expirationDate', expirationDate)

    authSuccess(localId)
    autoLogout(expiresIn)
  }

  const addUser = async (id, email) => {
    await axiosDb.put(`users/${id}.json`, {email})
  }

  const getUser = async () => {
    const id = state.id
    const response = await axiosDb.get(`users/${id}.json`)

    dispatch({
      type: GET_USER,
      user: response.data
    })
  }

  const {user, id} = state

  return (
    <AuthContext.Provider value={{
      autoLogin, auth, autoLogout, authSuccess, logout, getUser,
      isAuthenticated: !!id, user, id
    }}>
      {children}
    </AuthContext.Provider>
  )


}


