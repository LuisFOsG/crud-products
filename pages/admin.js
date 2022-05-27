import { useContext } from 'react'
import useAdmin from '../hooks/useAdmin'

import ProductContext from '../context/productContext'
import DataTable from '../components/Datatable'
import Loading from '../components/Loading'

export default function Admin () {
  const { productsList, updateProductsList } = useContext(ProductContext)

  const { status, logout } = useAdmin({
    redirectTo: '/login'
  })

  if (status.loading || !status.user) return <Loading />

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
