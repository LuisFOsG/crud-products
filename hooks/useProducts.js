import { useState, useEffect } from 'react'

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
  },
  {
    id: 3,
    title: 'Ghostbusters 2.0',
    year: '1985',
  },
  {
    id: 4,
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: 5,
    title: 'Ghostbusters',
    year: '1984',
  },
  {
    id: 6,
    title: 'Ghostbusters 2.0',
    year: '1985',
  },
  {
    id: 7,
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: 8,
    title: 'Ghostbusters',
    year: '1984',
  },
  {
    id: 9,
    title: 'Ghostbusters 2.0',
    year: '1985',
  },
  {
    id: 10,
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: 11,
    title: 'Ghostbusters',
    year: '1984',
  },
  {
    id: 12,
    title: 'Ghostbusters 2.0',
    year: '1985',
  },
]

const useProducts = (products) => {
  const [productsList, setProductsList] = useState(products || [])

  useEffect(() => {
    setProductsList(data)
  }, [])

  const searchProducts = (search) => {
    const filteredProducts = productsList.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
    setProductsList(filteredProducts)
  }

  return {
    productsList,
    searchProducts
  }
}

export default useProducts;
