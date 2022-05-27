import Head from 'next/head'

import { ThemeContextProvider } from '../context/themeContext'
import { ProductContextProvider } from '../context/productContext'

import usePageData from '../hooks/usePageData'

function MyApp ({ Component, pageProps }) {
  const { pageData } = usePageData()

  return (
    <>
      <Head>
        <title>{ pageData?.title }</title>
        <meta name="description" content={ pageData?.description } />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeContextProvider>
        <ProductContextProvider>
          <Component {...pageProps} />
        </ProductContextProvider>
      </ThemeContextProvider>

      <style global jsx>{`
        :root {
          --bg-color: #fcfcfc;
          --bg-color-opacity: #fcfcfc95;
          --primary-color: rgb(0,0,0);
          --secondary-color: rgb(15, 15, 15);
        }
        [data-theme="dark"] {
          --bg-color: #1a1a1a;
          --bg-color-opacity: #00000094;
          --primary-color: #f4f4f6;
          --secondary-color: #e2e9ef;
        }

        html,
        body {
          width: 100%;
          height: 100%;
          font-size: 14px;
          font-family: 'Rokkitt', serif;
          background-color: var(--bg-color);
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
          font-family: 'Rokkitt', serif;
          font-size: 1.3rem;
        }
      `}</style>
    </>
  )
}

export default MyApp
