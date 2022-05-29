import { useContext } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import ProductContext from '../../context/productContext'

const coLocale = Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP'
})

const Product = () => {
  const router = useRouter()
  const { productsList } = useContext(ProductContext)

  const { id } = router.query

  const product = productsList.find(product => product.id === id)

  if (!product) {
    return (
      <h1>
        Cargando...
      </h1>
    )
  }

  return (
    <>
      <Link href="/products">
        <div className="back">Regresar</div>
      </Link>

      <div className="container">
        <div className='wrap-image' >
          <Image layout="fill" objectFit='contain' src={product.image} alt={product.name} />
        </div>
        <div className='content' >
          <h1>{product.name}</h1>
          <small>{ coLocale.format(product.price) }</small>
          <p className='description'>{product.description}{ !product.description.endsWith('.') && '.' }</p>

          <article>
            <h2>Cantidades Disponibles</h2>
            <p className="option">{ product.quantity }</p>
            <h2>Via Administración</h2>
            <p className="option">{ product.viaAdministration }</p>
            <h2>Concentración</h2>
            <p className="option">{ product.concentration }</p>
            <h2>Forma Farmacéutica</h2>
            <p className="option">{ product.pharmaceuticalForm }</p>
          </article>
        </div>
      </div>

      <style jsx>{`
        .back {
          width: 10rem;
          border: 0;
          padding: 1rem 2rem;
          font-size: 1.3rem;
          border-radius: 0 0 15px;
          font-weight: bold;

          background-color: #333F47;
          color: white;
          cursor: pointer;
        }

        .back:hover {
          background-color: #4F5D66;
          color: white;
        }

        .container {
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

export default Product
