import { useContext } from 'react'
import DataTable from '../components/Datatable'

import ProductContext from '../context/productContext'

const columns = [
  {
    name: 'Titulo',
    selector: row => row.title,
    sortable: true
  },
  {
    name: 'Año',
    selector: row => row.year,
    sortable: true
  }
]

export default function Admin () {
  const { productsList } = useContext(ProductContext)

  return (
    <>
      <DataTable
        columns={columns}
        productsList={productsList}
      />
    </>
  )
}
