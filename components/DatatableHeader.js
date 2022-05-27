import SearchInput from './SearchInput'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import FormProduct from './FormProduct'

const MySwal = withReactContent(Swal)

const SubHeader = ({ productsList, updateProductsList, setData }) => {
  const handleClick = () => {
    MySwal.fire({
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      html: <FormProduct updateProductsList={updateProductsList}/>
    })
  }

  return (
    <>
      <SearchInput productsList={productsList} setData={setData} />
      <button onClick={handleClick}>Agregar Producto</button>

      <style jsx>{`
        button {
          margin: 0.3rem;
          border: 0;
          border-radius: 15px;
          padding: 1rem;

          font-size: 1.2rem;
          background-color: var(--primary-color);
          color: var(--bg-color);

          cursor: pointer;
        }

        button:hover {
          background-color: #4F5D66;
          color: white;
        }
      `}</style>
    </>
  )
}

export default SubHeader
