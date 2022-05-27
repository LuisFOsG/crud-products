import { useEffect } from 'react'
import Router from 'next/router'

import useToken, { DEFAULT_DATA } from './useToken'

const useAdmin = ({
  redirectTo,
  redirectIfFound
}) => {
  const { status, tokenAuth, setToken } = useToken()

  useEffect(() => {
    if (redirectIfFound && tokenAuth.token) {
      Router.push(redirectTo)
    }
    if (!tokenAuth.token && !redirectIfFound) Router.push(redirectTo)

    const checkTokenSetInterval = setInterval(() => {
      if (typeof window === 'undefined') return setToken(DEFAULT_DATA)
      const token = JSON.parse(window.localStorage.getItem('admin')) || DEFAULT_DATA
      setToken(token)
    }, 60000)

    return () => {
      clearInterval(checkTokenSetInterval)
    }
  }, [redirectIfFound, redirectTo, tokenAuth, setToken])

  const logout = () => {
    if (typeof window !== 'undefined') window.localStorage.removeItem('admin')
    setToken(DEFAULT_DATA)
  }

  return {
    status,
    setToken,
    logout
  }
}

export default useAdmin
