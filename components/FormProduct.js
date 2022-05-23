import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { addProduct } from '../firebase/client'

const MySwal = withReactContent(Swal)

const FormProduct = ({ updateProductsList }) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const data = {}

    formData.forEach((value, key) => {
      data[key] = value
    })

    setLoading(true)
    addProduct({
      name: data.name,
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

  return (
    <>
     <form onSubmit={handleSubmit}>
      <input autoFocus type="text" name="name" placeholder="Nombre del Producto"/>
      <input type="text" name="description" placeholder="Descripción del Producto"/>
      <input type="number" name="price" placeholder="Precio del Producto" />
      <input type="number" name="quantity" placeholder="Cantidades Existentes" />

      <button disabled={!!loading} type="submit">Agregar Producto</button>
     </form>
    </>
  )
}

export default FormProduct
