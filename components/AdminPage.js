const AdminPage = () => {
  const handleImageEvent = (e) => {
    console.log(e)
  }

  return (
    <>
      <input type="text" placeholder='Titulo de la Página' />
      <textarea placeholder='Descripción'></textarea>
      <input onChange={handleImageEvent} type="file" name="myImage" accept="image/png, image/gif, image/jpeg" />
    </>
  )
}

export default AdminPage
