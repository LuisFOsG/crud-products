import { useState, useEffect } from 'react'

const useProducts = (products = []) => {
  const [productsList] = useState(products)

  useEffect(() => {
    const getProducts = async () => {
      /* const res = await fetch('/api/products')
      const data = await res.json()

      setProductsList(data) */
    }

    getProducts()
  }, [])

  return {
    productsList
  }
}

export default useProducts
