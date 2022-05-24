import { useState, useEffect } from 'react'
import { getDownloadURL } from 'firebase/storage'

import { uploadImage } from '../firebase/client'

const useImage = () => {
  const [name, setName] = useState(null)
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    if (file) {
      const onProgress = () => {}
      const onError = () => {
        setImageUrl(null)
        setName(null)
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
    const newFile = e.target.files[0]
    const fileExt = newFile.name.split('.').pop()

    const newName = window.btoa(Date.now())
    const task = uploadImage(newFile, `${newName}.${fileExt}`)

    setName(`${newName}.${fileExt}`)
    setFile(task)
  }

  return {
    name,
    imageUrl,
    handleImageEvent
  }
}

export default useImage
