import Image from 'next/image'

const coLocale = Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP'
})

const ExpandedComponent = ({ data }) => {
  return (
    <>
      <div className="container">
        <div className='wrap-image' >
          <Image layout="fill" objectFit='contain' src={data.image} alt={data.name} />
        </div>
        <div className='content' >
          <h1>{data.name}</h1>
          <small>{ coLocale.format(data.price) }</small>
          <p className='description'>{data.description}{ !data.description.endsWith('.') && '.' }</p>

          <article>
            <h2>Cantidades Disponibles</h2>
            <p className="option">{ data.quantity }</p>
            <h2>Via Administración</h2>
            <p className="option">{ data.viaAdministration }</p>
            <h2>Concentración</h2>
            <p className="option">{ data.concentration }</p>
            <h2>Forma Farmacéutica</h2>
            <p className="option">{ data.pharmaceuticalForm }</p>
          </article>
        </div>
      </div>

      <style jsx>{`
        .container {
          width: 100vw;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          gap: 2rem;
          padding: 0 4rem;
        }

        .wrap-image {
          position: relative;
          width: 40%;
          height: 500px;
        }

        .content {
          width: 60%;
          padding: 2rem;
          border-radius: 15px;
          background-color: var(--bg-color-opacity);
          color: var(--primary-color);
        }

        .description {
          margin-top: 2rem;
        }

        article {
          margin-top: 2rem;
        }

        h1 {
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 2rem;
        }

        h2 {
          padding-left: 1rem;
        }

        .option {
          padding-left: 2rem;
          margin-bottom: 1rem;
        }
      `}</style>
    </>
  )
}

export default ExpandedComponent
