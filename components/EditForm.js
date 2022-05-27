import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { editProduct } from '../firebase/client'

import FormProduct from './FormProduct'

const MySwal = withReactContent(Swal)

const EditForm = ({ row, updateProducts }) => {
  const handleEditProduct = async (data) => {
    await editProduct({
      id: data.id,
      name: data.name,
      image: data.image ? `${data.image}?cache-bust=${Date.now()}` : null,
      imageName: data.imageName,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      viaAdministration: data.viaAdministration,
      concentration: data.concentration,
      pharmaceuticalForm: data.pharmaceuticalForm
    })

    updateProducts()

    MySwal.fire({
      title: 'Producto Editado',
      text: 'El producto se ha editado correctamente',
      icon: 'success'
    })
  }

  const handleClick = () => {
    MySwal.fire({
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      html: <FormProduct onEditProduct={handleEditProduct} edit={row}/>
    })
  }

  return (
    <>
      <button onClick={handleClick}>Editar</button>
      <style jsx>{`
        button {
          width: 100%;

          background: #51B5D0;
          color: black;

          border-radius: 15px;
          border: 0;
          padding: 0.5rem;

          cursor: pointer;
        }

        button:hover {
          background: #4A9BCC;
        }
      `}</style>
    </>
  )
}

export default EditForm
