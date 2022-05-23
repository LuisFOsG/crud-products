import { useState, useEffect } from 'react'
import Image from 'next/image'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getDownloadURL } from 'firebase/storage'

import { addProduct, uploadImage } from '../firebase/client'

const MySwal = withReactContent(Swal)

const FormProduct = ({ updateProductsList }) => {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    if (file) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        getDownloadURL(file.snapshot.ref).then((url) => {
          setImageUrl(url)
        })
      }
      file.on('state_changed', onProgress, onError, onComplete)
    }
  }, [file])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!imageUrl) return

    const form = e.target
    const formData = new FormData(form)
    const data = {}

    formData.forEach((value, key) => {
      data[key] = value
    })

    setLoading(true)
    addProduct({
      name: data.name,
      image: imageUrl,
      description: data.description,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity)
    })
      .then(async () => {
        setLoading(false)
        form.reset()

        MySwal.fire({
          title: 'Producto Agregado',
          text: 'El producto se ha agregado correctamente',
          type: 'success'
        })

        await updateProductsList()
      }).catch((_e) => {
        setLoading(false)
        MySwal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al agregar el producto',
          type: 'error'
        })
      })
  }

  const handleImage = (e) => {
    const task = uploadImage(e.target.files[0])
    setFile(task)
  }

  return (
    <>
     <form onSubmit={handleSubmit}>
       {
         imageUrl && (
            <Image width="500" height="300" src={imageUrl} alt="product" className="img-fluid" />
         )
       }

      <input autoFocus type="text" name="name" placeholder="Nombre del Producto"/>
      <input type="text" name="description" placeholder="Descripción del Producto"/>
      <input type="number" name="price" placeholder="Precio del Producto" />
      <input type="number" name="quantity" placeholder="Cantidades Existentes" />
      <input onChange={handleImage} type="file" name="myImage" accept="image/png, image/gif, image/jpeg" />

      <button disabled={!!loading} type="submit">Agregar Producto</button>
     </form>
    </>
  )
}

export default FormProduct
