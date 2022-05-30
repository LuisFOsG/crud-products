import { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import themeContext from '../context/themeContext'

import usePageData from '../hooks/usePageData'

export default function Home () {
  const { theme, toggleTheme } = useContext(themeContext)
  const { pageData } = usePageData()

  const URL_IMAGE = pageData.image

  return (
    <div className='container'>
      <div className="wrap">
        <div className='wrapper-image'>
          <Image layout='fill' objectFit="cover" src={URL_IMAGE} alt="Imagen de Prueba"></Image>
        </div>
      </div>

      <span className='title-content'>
        <h1>{ pageData?.title }</h1>
      </span>

      <section className='description-content'>
        { pageData?.description }
      </section>

      <footer className="footer">
        Power by: Luis Osorio & Bryan Muñoz
      </footer>

      <Link href="/products">
        <div className="button-products">
          Productos
        </div>
      </Link>

      <Link href="/admin">
        <div className="button-admin">
          Admin
        </div>
      </Link>

      <button className="darkmode" onClick={toggleTheme}>{ theme === 'dark' ? 'Modo Oscuro' : 'Modo Claro' }</button>

      <style jsx>{`
        .container {
          width: 100%;
          height: 100vh;

          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title-content {
          position: absolute;
          top: 20%;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        h1 {
          color: var(--primary-color);
          font-size: 5rem;
          font-weight: bold;
          text-align: center;
        }

        .wrap {
          position: relative;
          width: 100%;
          min-height: 300px;
          height: auto;
          filter: drop-shadow(-1px 6px 3px rgba(0, 0, 0, 0.4));
        }

        .wrapper-image {
          position: relative;
          width: 100%;
          min-height: 300px;
          height: auto;
          opacity: 0.8;
          clip-path: polygon(0 0, 100% 0%, 100% 80%, 0 100%);
        }

        .description-content {
          margin-top: 2rem;
          font-size: 3rem;
          text-align: center;
          color: var(--secondary-color);
        }

        .button-products {
          margin: 2rem;
          border: 0;
          border-radius: 15px;
          padding: 1rem 2rem;

          font-size: 2rem;
          background-color: var(--primary-color);
          color: var(--bg-color);

          cursor: pointer;
        }

        .button-products:hover {
          background-color: #30698E;
          color: white;
        }

        .button-admin {
          position: absolute;
          bottom: 0;
          right: 0;
          padding: 1rem 2rem;
          border-radius: 15px 0 0;

          font-size: 1.5rem;
          background-color: #4F5D66;
          color: white;

          cursor: pointer;
        }

        .button-admin:hover {
          background-color: var(--primary-color);
          color: var(--bg-color);
        }

        .darkmode {
          margin: 0;
          padding: 0.5rem 1rem;
          border-radius: 15px 0;

          font-size: 1.5rem;
          background-color: var(--bg-color);
          color: var(--primary-color);

          cursor: pointer;
        }

        .darkmode:hover {
          background-color: #4F5D66;
          color: white;
        }

        .footer {
          font-size: 1.5rem;
          color: var(--secondary-color);
        }
    `}</style>
    </div>
  )
}
