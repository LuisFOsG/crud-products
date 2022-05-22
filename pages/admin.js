import useProducts from '../hooks/useProducts'

import DataTable from '../components/Datatable'

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
  const { productsList } = useProducts()

  return (
    <>
      <DataTable
        columns={columns}
        productsList={productsList}
      />
    </>
  )
}
