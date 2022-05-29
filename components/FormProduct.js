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
      <h1>
      { edit ? 'Editar Producto' : 'Agregar Producto' }
      </h1>

      <div className="container">
        <div className="image-container">
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

          <input onChange={handleImageEvent} type="file" name="myImage" accept="image/png, image/gif, image/jpeg" required={isRequired} />
        </div>

        <div className="formulario">
          <label>Nombre</label>
          <input defaultValue={edit?.name || '' } autoFocus type="text" name="name" placeholder="Nombre del Producto" required={isRequired}/>

          <label>Descripción</label>
          <textarea defaultValue={edit?.description || '' } type="text" name="description" placeholder="Descripción del Producto" required={isRequired}/>

          <label>Precio</label>
          <input defaultValue={edit?.price || '' } type="number" name="price" placeholder="Precio del Producto" required={isRequired} />

          <label>Cantidades Existentes</label>
          <input defaultValue={edit?.quantity || '' } type="number" name="quantity" placeholder="Cantidades Existentes" required={isRequired} />

          <label>Vía Administración</label>
          <input defaultValue={edit?.viaAdministration || '' } type="text" name="viaAdministration" placeholder='Vía Administración' required={isRequired} />

          <label>Concentración</label>
          <input defaultValue={edit?.concentration || '' } type="text" name="concentration" placeholder='Concentración' required={isRequired} />

          <label>Forma Farmacéutica</label>
          <input defaultValue={edit?.pharmaceuticalForm || '' } type="text" name="pharmaceuticalForm" placeholder='Forma Farmacéutica' required={isRequired} />

          <button disabled={!!loading} type="submit">
            { edit ? 'Editar' : 'Agregar' } Producto
          </button>
        </div>
      </div>
    </form>

     <style global jsx>{`
        .swal2-popup {
          width: 60% !important;
        }

        @media (max-width: 600px) {
          .swal2-popup {
            width: 100% !important;
          }
        }
      `}</style>

     <style jsx>{`

        h1 {
          color: var(--primary-color);
          margin-top: 1rem;
          font-size: 2.5rem;
          font-weight: bold;
          text-align: center;
        }

      .container {
        min-width: 600px;

        display: flex;
        gap: 1rem;
        flex-direction: row;
      }

      .image-container {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .formulario {
        width: 50%;
      }

      label {
        display: block;
        margin-top: 1rem;
        text-align: left;
        padding-left: 2rem;
      }

      input, textarea {
        width: 100%;
        padding: 0.5rem 1rem;
        border: 1px solid #ccc;
        background-color: var(--bg-color-opacity);
        color: var(--primary-color);
        border-radius: 5px;
        outline: none;
      }

      textarea {
        resize: vertical;
      }

      input:hover, textarea:hover {
        border: 1px solid #75BECB;
      }

      button {
        outline: none;
        border: 0;
        margin-top: 2rem;
        padding: 1rem 2rem;
        background-color: var(--primary-color);
        color: var(--bg-color);
        cursor: pointer;
      }

      button:hover, input::-webkit-file-upload-button:hover {
        background-color: #75BECB;
      }

      button[disabled] {
        background-color: #ccc;
        cursor: auto;
        pointer-events: none;
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

      `}</style>
    </>
  )
}

export default FormProduct
