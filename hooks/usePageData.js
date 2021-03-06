import { useState, useEffect } from 'react'

import { getInfo } from '../firebase/client'

const usePageData = (data) => {
  const [pageData, setPageData] = useState(data || {
    title: '',
    description: '',
    image: ''
  })

  const changePageData = (data) => {
    const { name, value } = data.target
    const newData = {
      [name]: value
    }

    setPageData(e => ({
      ...e,
      ...newData
    }))
  }

  useEffect(() => {
    const getInfoEffect = async () => {
      const [info] = await getInfo()
      if (!info) return

      setPageData(e => ({
        ...e,
        ...info
      }))
    }

    getInfoEffect()
  }, [])

  return {
    pageData,
    changePageData
  }
}

export default usePageData
