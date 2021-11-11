import React, { useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/auth/authContext'

const Logout = () => {
  const { logout } = useContext(AuthContext)

  useEffect(() => {
    logout()
  }, [])

  return <Redirect to={'/'} />
}

export default Logout
