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
          --bg-color: #fafafa;
          --primary-color: black;
          --secondary-color: rgb(113, 128, 150);
        }

        [data-theme="dark"] {
          --bg-color: #121212;
          --primary-color: #f4f4f6;
          --secondary-color: #8999b0;
        }

        html,
        body {
          width: 100%;
          height: 100%;

          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
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
        }

      `}</style>
    </>
  )
}

export default MyApp
