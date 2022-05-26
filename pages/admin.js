import { useContext } from 'react'
import useAdmin from '../hooks/useAdmin'

import ProductContext from '../context/productContext'
import DataTable from '../components/Datatable'

export default function Admin () {
  const { productsList, updateProductsList } = useContext(ProductContext)

  const { status, logout } = useAdmin({
    redirectTo: '/login'
  })

  if (status.loading || !status.user) return <div>Loading...</div>

  return (
    <>
      <button onClick={logout} >Cerrar Sesión</button>
      <DataTable
        productsList={productsList}
        updateProductsList={updateProductsList}
      />
    </>
  )
}
