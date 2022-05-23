import SearchInput from './SearchInput'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import FormProduct from './FormProduct'

const MySwal = withReactContent(Swal)

const SubHeader = ({ productsList, updateProductsList, setData }) => {
  const handleClick = () => {
    const alert = MySwal.fire({
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      html: <FormProduct updateProductsList={updateProductsList}/>
    })

    alert.imageUrl = 'https://placeholder.pics/svg/300x200'
  }

  return (
    <>
      <SearchInput productsList={productsList} setData={setData} />
      <button onClick={handleClick}>Agregar Producto</button>
    </>
  )
}

export default SubHeader
