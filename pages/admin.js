import { useContext } from 'react'
import DataTable, { createTheme } from 'react-data-table-component';

import themeContext from '../context/themeContext'

import useProducts from '../hooks/useProducts';

const columns = [
  {
    name: 'Titulo',
    selector: row => row.title,
    sortable: true,
  },
  {
    name: 'Año',
    selector: row => row.year,
    sortable: true,
  },
];

createTheme('solarized', {
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
  },
  background: {
    default: '#002b36',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
}, 'dark');

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
const SubHeader = () => <h2>Subheader</h2>

export default function Admin() {
  const { theme } = useContext(themeContext)
  const { productsList } = useProducts()

  return (
    <>
      <DataTable
        columns={columns}
        data={productsList}
        theme={theme === 'dark' ? 'solarized' : 'default'}

        striped
        pagination
        responsive
        highlightOnHover

        fixedHeader
        fixedHeaderScrollHeight='500px'
        noHeader
        subHeader
        subHeaderComponent={<SubHeader />}

        expandableRows
        expandOnRowClicked
        expandableRowsComponent={ExpandedComponent}
      />
    </>
  )
}
