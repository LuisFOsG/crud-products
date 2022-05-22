import DataTable from 'react-data-table-component';

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

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

export default function Admin() {
  return (
    <div>
      <h1>Admin</h1>

      <DataTable
        columns={columns}
        data={data}

        pagination
        responsive
        highlightOnHover
        noHeader
        subHeader
        subHeaderAlign="center"
        striped

        selectableRows
        selectableRowsHighlight

        expandableRows
        expandOnRowClicked
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  )
}
