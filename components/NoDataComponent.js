import { useContext } from 'react'

import ProductContext from '../context/productContext'

const NoDataComponent = () => {
  const { productsList } = useContext(ProductContext)

  return (
    <>
      {
        productsList.length > 0
          ? <div>Ningún producto coincide con la busqueda</div>
          : <div>No hay productos agregados</div>
      }
    </>
  )
}

export default NoDataComponent
