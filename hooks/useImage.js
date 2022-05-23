import { useState, useEffect } from 'react'
import { getDownloadURL } from 'firebase/storage'

import { uploadImage } from '../firebase/client'

const useImage = () => {
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    if (file) {
      const onProgress = () => {}
      const onError = () => {
        setImageUrl(null)
      }
      const onComplete = () => {
        getDownloadURL(file.snapshot.ref).then((url) => {
          setImageUrl(url)
        })
      }

      file.on('state_changed', onProgress, onError, onComplete)
    }
  }, [file])

  const handleImageEvent = (e) => {
    const task = uploadImage(e.target.files[0])
    setFile(task)
  }

  return {
    imageUrl,
    handleImageEvent
  }
}

export default useImage
