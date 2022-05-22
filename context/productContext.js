import { createContext } from 'react'

import useProducts from '../hooks/useProducts'

const Context = createContext({
  productsList: []
})

export const ProductContextProvider = ({ children }) => {
  const { productsList } = useProducts()

  return (
    <Context.Provider value={{ productsList }}>
      { children }
    </Context.Provider>
  )
}

export default Context
