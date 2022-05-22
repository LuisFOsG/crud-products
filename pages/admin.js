import { useContext } from 'react'
import DataTable, { createTheme } from 'react-data-table-component';

import themeContext from '../context/themeContext'

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

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
  },
]

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

export default function Admin() {
  const { theme } = useContext(themeContext)

  return (
    <div>
      <h1>Admin</h1>

      <DataTable
        columns={columns}
        data={data}
        theme={theme === 'dark' ? 'solarized' : 'default'}

        striped
        pagination
        responsive
        highlightOnHover

        noHeader
        subHeader
        subHeaderComponent={<h2>Subheader</h2>}

        expandableRows
        expandOnRowClicked
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  )
}
