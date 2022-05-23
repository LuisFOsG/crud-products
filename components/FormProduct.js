import { addProduct } from '../firebase/client'

const FormProduct = () => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const data = {}

    formData.forEach((value, key) => {
      data[key] = value
    })

    const result = await addProduct({
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity
    })

    console.log(result)
  }

  return (
    <>
     <form onSubmit={handleSubmit}>
      <input autoFocus type="text" name="name" placeholder="Nombre del Producto"/>
      <input type="text" name="description" placeholder="Descripción del Producto"/>
      <input type="number" name="price" placeholder="Precio del Producto" />
      <input type="number" name="quantity" placeholder="Cantidades Existentes" />

      <button type="submit">Agregar Producto</button>
     </form>
    </>
  )
}

export default FormProduct
