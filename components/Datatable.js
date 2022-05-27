import { useState, useContext } from 'react'
import Image from 'next/image'
import DataTable, { createTheme } from 'react-data-table-component'

import themeContext from '../context/themeContext'

import ExpandedComponent from './Expanded'
import SubHeader from './DatatableHeader'
import NoDataComponent from './NoDataComponent'
import DeleteForm from './DeleteForm'
import EditForm from './EditForm'
import TimeAgo from './TimeAgo'

let updateProducts

const COLUMNS = [
  {
    name: 'Imagen',
    selector: row => {
      if (!row.image) return <p> - </p>
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
    selector: row => row.name || '',
    sortable: true
  },
  {
    name: 'Descripción',
    selector: row => row.description || '',
    sortable: true
  },
  {
    name: 'Precio',
    selector: row => row.price || '',
    sortable: true
  },
  {
    name: 'Cantidad',
    selector: row => row.quantity || '',
    sortable: true
  },
  {
    name: 'Vía Administración',
    selector: row => row.viaAdministration || '',
    sortable: true
  },
  {
    name: 'Concentración',
    selector: row => row.concentration || '',
    sortable: true
  },
  {
    name: 'Forma Farmacéutica',
    selector: row => row.pharmaceuticalForm || '',
    sortable: true
  },
  {
    name: 'Fecha de Creación',
    selector: row => {
      return row.createdAt ? <TimeAgo timestamp={row.createdAt} /> : '-'
    }
  },
  {
    name: 'Última Edición',
    selector: row => {
      return row.editedAt ? <TimeAgo timestamp={row.editedAt} /> : '-'
    }
  },
  {
    cell: (row) => {
      return (
        <div>
          <EditForm row={row} updateProducts={updateProducts} />
          <DeleteForm row={row} updateProducts={updateProducts} />
        </div>
      )
    },
    ignoreRowClick: true,
    allowOverflow: true,
    button: true
  }
]

createTheme('solarized', {
  text: {
    primary: '#e77c92',
    secondary: '#a573a4'
  },
  background: {
    default: '#08243f'
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF'
  },
  divider: {
    default: '#242439'
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
