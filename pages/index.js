import { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import themeContext from '../context/themeContext'

import usePageData from '../hooks/usePageData'

export default function Home () {
  const { theme, toggleTheme } = useContext(themeContext)
  const { pageData } = usePageData()

  const URL_IMAGE = pageData?.image.replace('random', Date.now())

  return (
    <div>
      <div className='wrapper-image'>
        <Image layout='fill' src={`${URL_IMAGE}?v1-${Date.now().toString()}`} alt="Imagen de Prueba"></Image>
      </div>

      <h1>{ pageData?.title }</h1>

      <Link href="/products">Products</Link>
      <Link href="/admin">Admin</Link>

      <button onClick={toggleTheme}>{ theme === 'dark' ? 'Light' : 'Dark' }</button>

      <style jsx>{`
        h1 {
          color: var(--primary-color);
        }

        .wrapper-image {
          position: relative;
          width: 500px;
          min-height: 300px;
          height: auto;
        }

        .wrapper-image img {
          object-fit: cover;
        }
    `}</style>
    </div>
  )
}
