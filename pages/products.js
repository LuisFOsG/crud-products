import { useState, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import ProductContext from '../context/productContext'
import SearchInput from '../components/SearchInput'

import usePageData from '../hooks/usePageData'

const coLocale = Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP'
})

export default function Products () {
  const { pageData } = usePageData()
  const { productsList } = useContext(ProductContext)
  const [data, setData] = useState(productsList)

  return (
    <div>
      <div className='header'>
        <Link href="/">
          <h1>{ pageData?.title }</h1>
        </Link>
        <SearchInput productsList={productsList} setData={setData} />
      </div>
      <div className="products">
        {
          data.map(product => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <div className="card">
              <div className="wrap-image">
                { product.image && <Image layout="fill" objectFit='contain' src={product.image} alt={product.name} /> }
              </div>
              <div className="card-content">
                <h3>{ product.name }</h3>
                <small>{ coLocale.format(product.price) }</small>
                <p>{ product.description.substring(0, 100).trim() }...</p>
              </div>
            </div>
            </Link>
          ))
        }
        {
          productsList.length === 0
            ? (<div>No hay productos disponibles</div>)
            : data.length === 0 && (<div>No se encontró ningun producto</div>)
        }
      </div>

      <style jsx>{`
        h1 {
          color: var(--primary-color);
          font-size: 3rem;
          font-weight: bold;
          text-align: center;
          cursor: pointer;
        }

        h3 {
          text-align: center;
        }

        p {
          margin-top: 1rem;
          opacity: 0.7;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-left: 3rem;
          padding-right: 2rem;
        }

        .products {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 30px;
          grid-auto-rows: minmax(100px, auto);
          padding: 3rem;
        }

        .card {
          background: var(--bg-color);
          border: 1px dotted var(--secondary-color);
          border-radius: 15px;

          display: flex;
          flex-direction: column;
          align-items: center;

          color: var(--primary-color);
          padding: 2rem;
          cursor: pointer;
        }

        .card:hover {
          border: 1px solid var(--primary-color);
          background-color: var(--bg-color-opacity);
        }

        .wrap-image {
          position: relative;
          width: 100%;
          height: 200px;
        }

        @media (max-width: 768px) {
          .products {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .products {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
