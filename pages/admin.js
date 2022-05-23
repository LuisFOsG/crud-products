import { useContext } from 'react'
import DataTable from '../components/Datatable'

import ProductContext from '../context/productContext'

const columns = [
  {
    name: 'Nombre',
    selector: row => row.name,
    sortable: true
  },
  {
    name: 'Descripción',
    selector: row => row.description,
    sortable: true
  },
  {
    name: 'Precio',
    selector: row => row.price,
    sortable: true
  },
  {
    name: 'Cantidad',
    selector: row => row.quantity,
    sortable: true
  }
]

export default function Admin () {
  const { productsList, updateProductsList } = useContext(ProductContext)

  return (
    <>
      <DataTable
        columns={columns}
        productsList={productsList}
        updateProductsList={updateProductsList}
      />
    </>
  )
}
