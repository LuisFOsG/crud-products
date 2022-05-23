import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { removeProduct } from '../firebase/client'

const MySwal = withReactContent(Swal)

async function handleButtonDelete ({ row, updateProducts }) {
  removeProduct({ id: row.id }).then(() => {
    updateProducts && updateProducts()
  })
}

const DeleteForm = ({ row, updateProducts }) => {
  const handleClick = () => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: 'No podras revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Regresar'
    }).then(async (result) => {
      if (result.value) {
        handleButtonDelete({ row, updateProducts })
      }
    })
  }

  return (
    <>
      <button onClick={handleClick}>Eliminar</button>
    </>
  )
}

export default DeleteForm
