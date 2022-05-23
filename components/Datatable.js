import { useState, useContext } from 'react'
import Image from 'next/image'
import DataTable, { createTheme } from 'react-data-table-component'

import themeContext from '../context/themeContext'

import ExpandedComponent from './Expanded'
import SubHeader from './DatatableHeader'
import NoDataComponent from './NoDataComponent'
import DeleteForm from './DeleteForm'
import TimeAgo from './TimeAgo'

let updateProducts

const handleButtonEdit = async (row) => {
  console.log(row)
}

const COLUMNS = [
  {
    name: 'Imagen',
    selector: row => {
      return (
        <Image
          src={row.image}
          alt={row.name}
          width={100}
          height={100}
        />
      )
    }
  },
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
  },
  {
    name: 'Fecha de Creación',
    selector: row => {
      return <TimeAgo timestamp={row.createdAt} />
    },
    sortable: true
  },
  {
    name: 'Última Edición',
    selector: row => {
      return <TimeAgo timestamp={row.editedAt} />
    },
    sortable: true
  },
  {
    cell: (row) => {
      return (
        <>
          <button onClick={() => { handleButtonEdit(row) }}>Editar</button>
          <DeleteForm row={row} updateProducts={updateProducts} />
        </>
      )
    },
    ignoreRowClick: true,
    allowOverflow: true,
    button: true
  }
]

createTheme('solarized', {
  text: {
    primary: '#268bd2',
    secondary: '#2aa198'
  },
  background: {
    default: '#002b36'
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF'
  },
  divider: {
    default: '#073642'
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)'
  }
}, 'dark')

const DataTableComponent = ({ productsList, updateProductsList }) => {
  const { theme } = useContext(themeContext)
  const [data, setData] = useState(productsList)

  updateProducts = () => {
    updateProductsList()
  }

  return (
    <DataTable
      columns={COLUMNS}
      data={data}
      noDataComponent={<NoDataComponent />}
      theme={theme === 'dark' ? 'solarized' : 'default'}

      striped
      pagination
      responsive
      highlightOnHover

      fixedHeader
      fixedHeaderScrollHeight='500px'
      noHeader
      subHeader
      subHeaderComponent={<SubHeader
        setData={setData}
        productsList={productsList}
        updateProductsList={updateProductsList}
      />}

      expandableRows
      expandOnRowClicked
      expandableRowsComponent={ExpandedComponent}
    />
  )
}

export default DataTableComponent
