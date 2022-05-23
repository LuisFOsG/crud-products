import { useState, useEffect } from 'react'

const EXCLUDE_ROW = ['id', 'image', 'editedAt', 'createdAt']

const useSearch = ({ productsList, setData }) => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (query === '') return setData(productsList)

    const filteredProductsList = productsList.filter(product => {
      const result = Object.keys(product).filter(key => {
        if (EXCLUDE_ROW.includes(key)) return false

        return String(product[key]).toLowerCase().includes(query.toLowerCase())
      })

      return result.length > 0
    })

    setData(filteredProductsList)
  }, [query, productsList, setData])

  return {
    handleChange: e => setQuery(e.target.value),
    query
  }
}

export default useSearch
