import { useState, useEffect } from 'react'

const usePageData = (data) => {
  const [pageData, setPageData] = useState(data || {})

  useEffect(() => {
    let controller = new AbortController();

    fetch('https://628979125da6ddfd5d586fdd.mockapi.io/description', {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(data => setPageData(data[0]))
  }, [])

  return {
    pageData
  }
}

export default usePageData
