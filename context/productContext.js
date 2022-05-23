import { createContext } from 'react'

import useProducts from '../hooks/useProducts'

const Context = createContext({
  productsList: [],
  updateProductsList: async () => {}
})

export const ProductContextProvider = ({ children }) => {
  const { productsList, updateProductsList } = useProducts()

  return (
    <Context.Provider value={{ productsList, updateProductsList }}>
      { children }
    </Context.Provider>
  )
}

export default Context
