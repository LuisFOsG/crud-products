import { useEffect } from 'react'
import Router from 'next/router'

const useAdmin = ({
  redirectTo,
  redirectIfFound
}) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(window.localStorage.getItem('admin'))

      if (user) {
        if (redirectIfFound) Router.push(redirectTo)
      } else if (!redirectIfFound) Router.push(redirectTo)
    } else {
      if (!redirectIfFound) Router.push(redirectTo)
    }
  }, [redirectIfFound, redirectTo])

  return {
  }
}

export default useAdmin
