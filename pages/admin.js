import { useContext } from 'react'

import ProductContext from '../context/productContext'
import DataTable from '../components/Datatable'

export default function Admin () {
  const { productsList, updateProductsList } = useContext(ProductContext)

  return (
    <>
      <DataTable
        productsList={productsList}
        updateProductsList={updateProductsList}
      />
    </>
  )
}
