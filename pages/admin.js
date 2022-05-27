import { useContext } from 'react'

import useAdmin from '../hooks/useAdmin'

import themeContext from '../context/themeContext'
import ProductContext from '../context/productContext'

import DataTable from '../components/Datatable'
import Loading from '../components/Loading'
/* import AdminPage from '../components/AdminPage' */

export default function Admin () {
  const { theme, toggleTheme } = useContext(themeContext)
  const { productsList, updateProductsList } = useContext(ProductContext)

  const { status, logout } = useAdmin({
    redirectTo: '/login'
  })

  if (status.loading || !status.user) return <Loading />

  return (
    <>
      <button className="logout" onClick={logout} >Cerrar Sesión</button>
      <button className="darkmode" onClick={toggleTheme}>{ theme === 'dark' ? 'Modo Oscuro' : 'Modo Claro' }</button>

      <h1>Panel Administrativo</h1>

      {/* <AdminPage/> */}
      <DataTable
        productsList={productsList}
        updateProductsList={updateProductsList}
      />

      <style jsx>{`
        button {
          border: 0;
          background: var(--primary-color);
          color: var(--bg-color);
          padding: 0.5rem 1rem;
          cursor: pointer;
        }

        h1 {
          color: var(--primary-color);
          font-size: 4rem;
          font-weight: bold;
          text-align: center;
        }

        button:hover {
          background: #3191AA;
          color: black;
        }

        .darkmode {
          border-radius: 0 0 15px;
        }

        .logout {
          margin-left: 1rem;
          border-radius: 0 0 0 15px;
        }
      `}</style>
    </>
  )
}
