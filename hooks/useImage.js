import { useState, useEffect } from 'react'
import { getDownloadURL } from 'firebase/storage'

import { uploadImage, deleteImage } from '../firebase/client'

const VALID_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'jfif', 'png', 'gif']

const useImage = () => {
  const [infoImage, setInfo] = useState({
    name: null,
    error: null,
    loading: false
  })

  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    if (file) {
      const onProgress = () => {}
      const onError = () => {
        setImageUrl(null)
        setInfo(e => {
          return {
            ...e,
            name: null,
            loading: false
          }
        })
      }
      const onComplete = () => {
        getDownloadURL(file.snapshot.ref).then((url) => {
          setImageUrl(url)
          setInfo(e => {
            return {
              ...e,
              loading: false
            }
          })
        })
      }

      file.on('state_changed', onProgress, onError, onComplete)
    }
  }, [file])

  const handleImageEvent = async (e) => {
    if (!e.target.files[0]) return

    const newFile = e.target.files[0]
    if (!newFile) return

    const fileExt = newFile.name.split('.').pop()
    if (VALID_IMAGE_EXTENSIONS.indexOf(fileExt) === -1) {
      setInfo(e => {
        return {
          ...e,
          error: 'El archivo debe ser una imagen'
        }
      })
      return
    } else {
      setInfo(e => {
        return {
          ...e,
          error: null
        }
      })
    }

    if (newFile && infoImage.name) await deleteImage(infoImage.name)

    const newName = window.btoa(Date.now())
    const task = uploadImage(newFile, `images/${newName}.${fileExt}`)

    setInfo(e => {
      return {
        ...e,
        name: `${newName}.${fileExt}`,
        loading: true
      }
    })
    setFile(task)
  }

  return {
    infoImage,
    imageUrl,
    handleImageEvent
  }
}

export default useImage
