import { useState, useContext } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'

import themeContext from '../context/themeContext'

import ExpandedComponent from './Expanded'
import SubHeader from './DatatableHeader'

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

const DataTableComponent = ({ columns, productsList }) => {
  const { theme } = useContext(themeContext)
  const [data, setData] = useState(productsList)

  return (
    <DataTable
      columns={columns}
      data={data}
      theme={theme === 'dark' ? 'solarized' : 'default'}

      striped
      pagination
      responsive
      highlightOnHover

      fixedHeader
      fixedHeaderScrollHeight='500px'
      noHeader
      subHeader
      subHeaderComponent={<SubHeader setData={setData} productsList={productsList} />}

      expandableRows
      expandOnRowClicked
      expandableRowsComponent={ExpandedComponent}
    />
  )
}

export default DataTableComponent
