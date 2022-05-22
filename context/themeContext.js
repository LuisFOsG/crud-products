import { createContext } from 'react'

import useToggleDarkmode from '../hooks/useToggleTheme'

const Context = createContext({
  theme: 'light',
  toggleTheme: () => {}
})

export const ThemeContextProvider = ({ children }) => {
  const { theme, toggleTheme } = useToggleDarkmode()

  return (
    <Context.Provider value={{ theme, toggleTheme }}>
      { children }
    </Context.Provider>
  )
}

export default Context
