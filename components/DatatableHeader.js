import SearchInput from './SearchInput'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import FormProduct from './FormProduct'

const MySwal = withReactContent(Swal)

const SubHeader = ({ productsList, setData }) => {
  const handleClick = () => {
    const alert = MySwal.fire({
      imageUrl: 'https://placeholder.pics/svg/200x200',
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      html: <FormProduct/>
    })

    alert.imageUrl = 'https://placeholder.pics/svg/300x200'
  }

  return (
    <>
      <SearchInput productsList={productsList} setData={setData} />
      <button onClick={handleClick}>Agregar Nuevo Producto</button>
    </>
  )
}

export default SubHeader
