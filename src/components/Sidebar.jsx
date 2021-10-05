import React from 'react'
import ImagenLogo from './ImagenLogo'
import {Link} from 'react-router-dom'

const Sidebar = () => {
    return (
         <nav className="hidden md:flex w-72  flex-col   bg-gradient-to-t from-gray-500 to-white p-4 ">
        
            <Link to="/">
                <ImagenLogo />
            </Link>
            <div className='my-4'>
        <Ruta icono='fas fa-user' ruta='/menu' nombre='Menú de opciones' />
        <Ruta icono='fas fa-car' ruta='/menu/ventas' nombre='Gestión de Ventas' />
        <Ruta icono='fas fa-cash-register' ruta='/menu/productos' nombre='Gestión de Productos' />
        <Ruta icono='fas fa-users' ruta='/menu/usuarios' nombre='Gestión de Usuarios' />
      </div>
      <button>Cerrar Sesión</button>
        </nav>
              
    )
}
const Ruta = ({ icono, ruta, nombre }) => {
    return (
      <Link to={ruta}>
        <button className='p-1 my-2 bg-indigo-700 hover:bg-indigo-900 flex w-full  text-white rounded-md justify-items-center'>
          <i className={`${icono} w-10`} />
          {nombre}
        </button>
      </Link>
    );
  };


export default Sidebar
