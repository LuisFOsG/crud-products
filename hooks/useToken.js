import { useState, useEffect } from 'react'

export const DEFAULT_DATA = {
  token: null
}

const useToken = () => {
  const [status, setStatus] = useState({
    loading: true
  })

  const [tokenAuth, setTokenAuth] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_DATA
    return JSON.parse(window.localStorage.getItem('admin')) || DEFAULT_DATA
  })

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    if (tokenAuth.token) {
      fetch('/api/admin/verify', {
        signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: tokenAuth.token
        })
      }).then(res => {
        if (res.status !== 200) {
          if (typeof window !== 'undefined') window.localStorage.removeItem('admin')
          setTokenAuth(DEFAULT_DATA)
          setStatus({
            loading: false
          })
        } else {
          setStatus(e => {
            return {
              ...e,
              loading: false,
              user: Date.now()
            }
          })
        }

        setStatus(e => {
          return {
            ...e,
            loading: false
          }
        })
      })
    } else {
      setStatus({
        loading: false
      })
    }

    return () => {
      try {
        abortController.abort()
      } catch (error) {
        console.log(error)
      }
    }
  }, [tokenAuth])

  const setToken = (token) => {
    if (typeof window !== 'undefined') window.localStorage.setItem('admin', JSON.stringify(token))
    setTokenAuth(token)
  }

  return {
    status,
    tokenAuth,
    setToken
  }
}

export default useToken
