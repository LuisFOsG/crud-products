import { useState, useEffect } from 'react'

const usePageData = (data) => {
  const [pageData, setPageData] = useState(data || {
    title: 'Titulo de Prueba',
    description: 'Descripción de Prueba',
    image: 'https://picsum.photos/seed/random/200/300'
  })

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/description', {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(data => setPageData(data))
  }, [])

  return {
    pageData
  }
}

export default usePageData
