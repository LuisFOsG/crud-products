function MyApp({ Component, pageProps }) {
  const color = "white";

  return <>
    <Component {...pageProps} />

    <style global jsx>{`
      html,
      body {
        width: 100%;
        height: 100%;

        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        background-color: ${color};
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
}

export default MyApp
