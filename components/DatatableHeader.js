import SearchInput from './SearchInput'

const SubHeader = ({ productsList, setData }) => {
  return (
    <>
      <SearchInput productsList={productsList} setData={setData} />
    </>
  )
}

export default SubHeader
