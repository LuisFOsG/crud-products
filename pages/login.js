import { useState } from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import usePageData from '../hooks/usePageData'
import useAdmin from '../hooks/useAdmin'

import Loading from '../components/Loading'

const MySwal = withReactContent(Swal)

export default function Login () {
  const { pageData } = usePageData()
  const [message, setMessage] = useState('')

  const { status, setToken } = useAdmin({
    redirectTo: '/admin',
    redirectIfFound: true
  })

  const setPassword = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = {}

    formData.forEach((value, key) => {
      data[key] = value
    })

    window.fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setToken(data.data)
        } else {
          setMessage(data.error)
        }
      })
  }

  if (status.loading) return <Loading />
  if (pageData.title === '') return <Loading />

  if (message.length > 0) {
    MySwal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message
    }).then(() => {
      setMessage('')
    })
  }

  return (
    <>
      <div className="wallpaper">
        <Link href="/">
          <div className="button-inicio">
            Inicio
          </div>
        </Link>

        <div className="container">

          <h1>Iniciar Sesión</h1>

          <form onSubmit={setPassword}>
            <input type="text" name='username' placeholder="Ingrese su Usuario" required />
            <input type="password" name='password' placeholder='Ingrese su Contraseña' required />
            <button className="button-login" type="submit">Ingresar</button>
          </form>

        </div>
      </div>

      <style jsx>{`
        .wallpaper {
          width: 100%;
          height: 100vh;
          background: black;
          background-image: url(${pageData.image});
          background-repeat: no-repeat;
          background-size: cover;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .container {
          width: 60%;
          height: 80%;
          border-radius: 15px;
          background: var(--bg-color-opacity);
          backdrop-filter: blur(6px);

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        h1 {
          color: var(--primary-color);
          font-size: 3rem;
          font-weight: bold;
          text-align: center;
        }

        form {
          margin-top: 2rem;
          width: 100%;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        input {
          width: 50%;
          height: 3rem;
          margin: 1rem;
          font-size: 1.5rem;
          border: 0;
          border-radius: 5px;
          outline: none;
          padding: 1rem;

          text-align: center;
          background: var(--bg-color-opacity);
          color: var(--primary-color);
        }

        .button-login {
          border: 0;
          margin-top: 2rem;
          padding: 1rem 2rem;
          font-size: 1.9rem;
          border-radius: 5px;
          font-weight: bold;

          background-color: #333F47;
          color: white;
          cursor: pointer;
        }

        .button-login:hover {
          background-color: #4F5D66;
          color: white;
        }

        .button-inicio {
          position: absolute;
          top: 0;
          left: 0;
          padding: 1rem 2rem;
          border-radius: 0 0 15px;

          font-size: 1.5rem;
          background-color: #4F5D6650;
          color: white;

          cursor: pointer;
        }

        .button-inicio:hover {
          background-color: var(--bg-color-opacity);
          color: var(--primary-color);
        }
      `}</style>
    </>
  )
}
