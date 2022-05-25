import { useContext } from 'react'
import useAdmin from '../hooks/useAdmin'

import ProductContext from '../context/productContext'
import DataTable from '../components/Datatable'

export default function Admin () {
  const { productsList, updateProductsList } = useContext(ProductContext)

  useAdmin({
    redirectTo: '/login'
  })

  return (
    <>
      <DataTable
        productsList={productsList}
        updateProductsList={updateProductsList}
      />
    </>
  )
}
