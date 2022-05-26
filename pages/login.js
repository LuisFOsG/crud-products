import { useState } from 'react'
import useAdmin from '../hooks/useAdmin'

export default function Login () {
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

  if (status.loading) return <div>Loading...</div>

  return (
    <div>
      <form onSubmit={setPassword}>
        <input type="text" name='username' placeholder="Ingrese su Usuario" />
        <input type="password" name='password' placeholder='Ingrese su contraseña'/>
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  )
}
