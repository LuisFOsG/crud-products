import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

/* import { removeProduct } from '../firebase/client' */

import FormProduct from './FormProduct'

const MySwal = withReactContent(Swal)

const EditForm = ({ row, updateProducts }) => {
  const handleClick = () => {
    MySwal.fire({
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      html: <FormProduct edit={row} updateProductsList={updateProducts}/>
    })
  }

  return (
    <>
      <button onClick={handleClick}>Editar</button>
    </>
  )
}

export default EditForm
