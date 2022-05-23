import { useState, useEffect } from 'react'

import { getProducts } from '../firebase/client'

const useProducts = (products = []) => {
  const [productsList, setProductsList] = useState(products)

  useEffect(() => {
    const getProductsEffect = async () => {
      const products = await getProducts()
      setProductsList(products)
    }

    getProductsEffect()
  }, [])

  const updateProductsList = async () => {
    const products = await getProducts()
    setProductsList(products)
  }

  return {
    productsList,
    updateProductsList
  }
}

export default useProducts
