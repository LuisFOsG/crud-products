import { useState, useEffect } from 'react'
import Router from 'next/router'

const DEFAULT_DATA = {
  token: null
}

const useAdmin = ({
  redirectTo,
  redirectIfFound
}) => {
  const [tokenAuth, setTokenAuth] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_DATA
    return JSON.parse(window.localStorage.getItem('admin')) || DEFAULT_DATA
  })

  useEffect(() => {
    if (redirectIfFound && tokenAuth.token) {
      Router.push(redirectTo)
    }
    if (!tokenAuth.token && !redirectIfFound) Router.push(redirectTo)

    const checkTokenSetInterval = setInterval(() => {
      if (typeof window === 'undefined') return setTokenAuth(DEFAULT_DATA)
      const token = JSON.parse(window.localStorage.getItem('admin')) || DEFAULT_DATA
      setTokenAuth(token)
    }, 10000)

    return () => {
      clearInterval(checkTokenSetInterval)
    }
  }, [redirectIfFound, redirectTo, tokenAuth])

  const setToken = (token) => {
    if (typeof window !== 'undefined') window.localStorage.setItem('admin', JSON.stringify(token))
    setTokenAuth(token)
  }

  return {
    tokenAuth,
    setToken
  }
}

export default useAdmin
