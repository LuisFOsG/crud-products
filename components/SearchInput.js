import useSearch from '../hooks/useSearch'

const Search = ({ productsList, setData }) => {
  const { handleChange, query } = useSearch({
    productsList,
    setData
  })

  return (
    <>
      <input value={query} type="text" placeholder="Buscar" onChange={handleChange} />
    </>
  )
}

export default Search
