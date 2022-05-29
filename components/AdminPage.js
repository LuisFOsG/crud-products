import Image from 'next/image'

import usePageData from '../hooks/usePageData'

const AdminPage = () => {
  const { pageData, changePageData } = usePageData()

  const handleImageEvent = (e) => {
    console.log(e)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submit')
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className='content'>
          <input name="title" value={pageData?.title || '' } onChange={changePageData} type="text" placeholder='Titulo de la Página' />
          <textarea name="description" value={pageData?.description || '' } onChange={changePageData} placeholder='Descripción'></textarea>
          <input onChange={handleImageEvent} type="file" name="myImage" accept="image/png, image/gif, image/jpeg" />

          <button type="submit">Guardar Información</button>
        </form>

        <div className='wrap-image'>
          <Image src={ pageData?.image } layout='fill' objectFit='contain' alt="Imagen" />
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          gap: 2rem;
          padding: 0 4rem;
        }

        .content {
          width: 60%;
          border-radius: 15px;
          color: var(--primary-color);

          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .wrap-image {
          position: relative;
          width: 40%;
          height: 300px;
        }

        input, textarea {
          width: 100%;
          padding: 0.5rem 1rem;
          border: 1px solid #ccc;
          background-color: var(--bg-color-opacity);
          color: var(--primary-color);
          border-radius: 5px;
          outline: none;
        }

        button {
          outline: none;
          border: 0;
          margin-top: 2rem;
          padding: 1rem 2rem;
          background-color: var(--primary-color);
          color: var(--bg-color);
          font-weight: bold;
          cursor: pointer;
        }

        input::-webkit-file-upload-button {
          outline: none;
          border: 0;
          border-radius: 15px;
          padding: 1rem;
          background-color: var(--primary-color);
          color: var(--bg-color);
          cursor: pointer;
        }

        button:hover, input::-webkit-file-upload-button:hover {
          background-color: #75BECB;
        }

        textarea {
          resize: vertical;
        }
      `}</style>
    </>
  )
}

export default AdminPage
