import { useState, useEffect } from 'react'

const EXCLUDE_ROW = ['id', 'image', 'editedAt', 'createdAt']

const includeString = (str, search) => {
  str = String(str).toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  search = String(search).toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  return str.includes(search)
}

const useSearch = ({ productsList, setData }) => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (query === '') return setData(productsList)

    const filteredProductsList = productsList.filter(product => {
      const result = Object.keys(product).filter(key => {
        if (EXCLUDE_ROW.includes(key)) return false

        return includeString(product[key], query)
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
