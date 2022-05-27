import useSearch from '../hooks/useSearch'

const Search = ({ productsList, setData }) => {
  const { handleChange, query } = useSearch({
    productsList,
    setData
  })

  return (
    <>
      <input value={query} type="text" placeholder="Buscar" onChange={handleChange} />

      <style jsx>{`
        input {
          width: 30%;
          height: 3rem;
          margin: 1rem;
          font-size: 1.5rem;
          border: 0;
          border-radius: 5px;
          outline: none;
          padding: 1rem;

          text-align: center;
          background: var(--bg-color-opacity);
          color: var(--primary-color);
        }
      `}</style>
    </>
  )
}

export default Search
