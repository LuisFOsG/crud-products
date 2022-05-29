import Image from 'next/image'

const coLocale = Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP'
})

const ExpandedComponent = ({ data }) => {
  return (
    <>
      <div className="card">
        <div className="wrap-image">
          { data.image && <Image layout="fill" objectFit='contain' src={data.image} alt={data.name} /> }
        </div>
        <div className="card-content">
          <h3>{ data.name }</h3>
          <small>{ coLocale.format(data.price) }</small>
          <p>{ data.description.substring(0, 100).trim() }...</p>
        </div>
      </div>

      <style jsx>{`
        .card {
          background: var(--bg-color);
          width: 100vw;

          display: flex;
          flex-direction: column;

          color: var(--primary-color);
          padding: 2rem;
          cursor: pointer;
        }

        .wrap-image {
          position: relative;
          width: 100%;
          height: 200px;
        }

        h3 {
          text-align: center;
        }

        p {
          margin-top: 1rem;
          opacity: 0.7;
        }
      `}</style>
    </>
  )
}

export default ExpandedComponent
