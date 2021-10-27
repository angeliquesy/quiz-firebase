import React, {useReducer} from 'react'
import axios from 'axios'
import {AUTH_LOGOUT, AUTH_SUCCESS} from '../types'
import {authReducer} from './authReducer'
import {AuthContext} from './authContext'

export const AuthState = ({children}) => {
  const initialState = {
    token: null
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

    if (!token) {
      logout()
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        logout()
      } else {
        authSuccess(token)
        autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
      }
    }
  }

  const authSuccess = token => dispatch({
    type: AUTH_SUCCESS,
    payload: token
  })

  const auth = async (email, password, isLogin) => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPg1ppEmNlVms9f4WAtq56AjuAfLLRUOY'

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPg1ppEmNlVms9f4WAtq56AjuAfLLRUOY'
    }

    const response = await axios.post(url, authData)
    const data = response.data

    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('expirationDate', expirationDate)

    authSuccess(data.idToken)
    autoLogout(data.expiresIn)
  }

  return (
    <AuthContext.Provider value={{
      autoLogin, auth, autoLogout, authSuccess, logout,
      isAuthenticated: !!state.token,
    }}>
      {children}
    </AuthContext.Provider>
  )


}


