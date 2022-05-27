import { useState } from 'react'
import Image from 'next/image'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { addProduct } from '../firebase/client'
import useImage from '../hooks/useImage'

const MySwal = withReactContent(Swal)

const FormProduct = ({ edit, onEditProduct, updateProductsList }) => {
  const [loading, setLoading] = useState(false)
  const { infoImage, imageUrl, handleImageEvent } = useImage()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!imageUrl && !edit) return

    const form = e.target
    const formData = new FormData(form)
    const data = {}

    formData.forEach((value, key) => {
      data[key] = value
    })

    if (edit) {
      setLoading(true)
      await onEditProduct({
        ...data,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
        id: edit.id,
        image: imageUrl,
        imageName: infoImage.name
      })
      return setLoading(false)
    }

    setLoading(true)
    addProduct({
      name: data.name,
      image: imageUrl,
      imageName: infoImage.name,
      description: data.description,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity),
      viaAdministration: data.viaAdministration,
      concentration: data.concentration,
      pharmaceuticalForm: data.pharmaceuticalForm
    })
      .then(async () => {
        setLoading(false)
        form.reset()

        MySwal.fire({
          title: 'Producto Agregado',
          text: 'El producto se ha agregado correctamente',
          icon: 'success'
        })

        await updateProductsList()
      }).catch((_e) => {
        setLoading(false)
        MySwal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al agregar el producto',
          icon: 'error'
        })
      })
  }

  const DEFAULT_IMAGE = edit?.image ? edit.image : 'https://picsum.photos/seed/random/200/300'
  const LOADING = infoImage.loading ? () => { return <div>Cargando...</div> } : null
  const isRequired = !edit

  return (
    <>
     <form onSubmit={handleSubmit}>
      {
        LOADING
          ? <LOADING/>
          : imageUrl
            ? (
              <Image width="500" height="300" src={imageUrl} alt="product" />
              )
            : (
              <Image width="500" height="300" src={DEFAULT_IMAGE} alt="product" />
              )
      }

      <input defaultValue={edit?.name || '' } autoFocus type="text" name="name" placeholder="Nombre del Producto" required={isRequired}/>

      <input defaultValue={edit?.description || '' } type="text" name="description" placeholder="Descripción del Producto" required={isRequired}/>

      <input defaultValue={edit?.price || '' } type="number" name="price" placeholder="Precio del Producto" required={isRequired} />

      <input defaultValue={edit?.quantity || '' } type="number" name="quantity" placeholder="Cantidades Existentes" required={isRequired} />

      <input defaultValue={edit?.viaAdministration || '' } type="text" name="viaAdministration" placeholder='Vía Administración' required={isRequired} />
      <input defaultValue={edit?.concentration || '' } type="text" name="concentration" placeholder='Concentración' required={isRequired} />
      <input defaultValue={edit?.pharmaceuticalForm || '' } type="text" name="pharmaceuticalForm" placeholder='Forma Farmacéutica' required={isRequired} />

      <input onChange={handleImageEvent} type="file" name="myImage" accept="image/png, image/gif, image/jpeg" required={isRequired} />

      <button disabled={!!loading} type="submit">
        { edit ? 'Editar' : 'Agregar' } Producto
      </button>
     </form>
    </>
  )
}

export default FormProduct
