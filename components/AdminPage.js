import { useState, useEffect } from 'react'
import { getDownloadURL } from 'firebase/storage'
import Image from 'next/image'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import usePageData from '../hooks/usePageData'
import Loading from '../components/Loading'

import { uploadImage, setInfo } from '../firebase/client'

const MySwal = withReactContent(Swal)

const AdminPage = () => {
  const { pageData, changePageData } = usePageData()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [file, setFile] = useState(null)

  useEffect(() => {
    if (file) {
      const onProgress = () => {}
      const onError = () => {
        setImageUrl(null)
        setLoading(false)
      }
      const onComplete = () => {
        getDownloadURL(file.snapshot.ref).then((url) => {
          setImageUrl(url)
          setLoading(false)
        })
      }

      file.on('state_changed', onProgress, onError, onComplete)
    }
  }, [file])

  const handleImageEvent = async (e) => {
    if (!e.target.files[0]) return
    const newFile = e.target.files[0]
    const fileExt = newFile.name.split('.').pop()

    const newName = 'background'
    setLoading(true)
    const task = uploadImage(newFile, `page/${newName}.${fileExt}`)
    setFile(task)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setInfo({
      id: pageData.id,
      title: pageData.title,
      description: pageData.description,
      image: imageUrl
    }).then(() => {
      MySwal.fire({
        title: 'Datos Guardados',
        text: 'Los Datos Ingresados se han guardado correctamente. por favor recargue la página',
        icon: 'success'
      })
    })
  }

  const DEFAULT_IMAGE = imageUrl || pageData.image

  if (pageData.title === '') return <Loading />

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className='content'>
          <label>Titulo de la Página: </label>
          <input name="title" value={pageData?.title || '' } onChange={changePageData} type="text" placeholder='Titulo de la Página' />

          <label>Descripción:</label>
          <textarea name="description" value={pageData?.description || '' } onChange={changePageData} placeholder='Descripción'></textarea>

          <label>Nueva Imagen de fondo</label>
          <input onChange={handleImageEvent} type="file" name="myImage" accept="image/png, image/gif, image/jpeg" />

          <button type="submit">Guardar Información</button>
        </form>

        <div className='wrap-image'>
          {
            loading ? (<div>Cargando...</div>) : <Image src={ DEFAULT_IMAGE } layout='fill' objectFit='contain' alt="Imagen" />
          }
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          gap: 2rem;
          padding: 0 4rem;
          margin-bottom: 2rem;
        }

        .content {
          width: 60%;
          border-radius: 15px;
          color: var(--primary-color);

          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .wrap-image {
          position: relative;
          width: 40%;
          height: 300px;
        }

        label {
          display: block;
          margin-top: 1rem;
          text-align: left;
          padding-left: 2rem;
          color: var(--primary-color);
        }

        input, textarea {
          width: 100%;
          padding: 0.5rem 1rem;
          border: 1px solid #cccccc40;
          background-color: var(--bg-color-opacity);
          color: var(--primary-color);
          border-radius: 5px;
          outline: none;
        }

        button {
          outline: none;
          border: 0;
          margin-top: 2rem;
          padding: 1rem 2rem;
          background-color: var(--primary-color);
          color: var(--bg-color);
          font-weight: bold;
          cursor: pointer;
        }

        input::-webkit-file-upload-button {
          outline: none;
          border: 0;
          border-radius: 15px;
          padding: 1rem;
          background-color: var(--primary-color);
          color: var(--bg-color);
          cursor: pointer;
        }

        button:hover, input::-webkit-file-upload-button:hover {
          background-color: #75BECB;
        }

        textarea {
          resize: vertical;
        }
      `}</style>
    </>
  )
}

export default AdminPage
