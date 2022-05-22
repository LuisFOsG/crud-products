import { useState, useEffect } from 'react'

const useToggleTheme = () => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    const newTheme = localTheme === 'dark' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.dataset.theme = newTheme
  }, [])

  const toggleTheme = () => {
    const currentTheme = document.documentElement.dataset.theme

    if (currentTheme === 'dark') {
      setTheme('light')
      document.documentElement.dataset.theme = 'light'
      window.localStorage.setItem('theme', 'light')
    } else {
      setTheme('dark')
      document.documentElement.dataset.theme = 'dark'
      window.localStorage.setItem('theme', 'dark')
    }
  }

  return {
    theme,
    toggleTheme
  }
}

export default useToggleTheme
