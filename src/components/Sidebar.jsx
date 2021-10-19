import React from 'react'
import ImagenLogo from './ImagenLogo'
import { Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCashRegister, faChevronCircleDown, faPoll,  faUsers } from '@fortawesome/free-solid-svg-icons'
import useActiveRoute from 'hooks/useActiveRoute'
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = () => {
  const {user, logout } = useAuth0();
  const cerrarSesion=()=>{
    logout({ returnTo: window.location.origin })
    localStorage.setItem('token',null)
  }
  return (
    <nav className="hidden lg:flex md:flex w-72  flex-col   bg-gradient-to-t from-gray-500 to-white p-4 ">

      <Link to="/">
        <ImagenLogo />
      </Link>
      <div className='my-2'>
        {user?(<div 
        className='flex flex-row border border-gray-600 text-white rounded-md justify-items-center bg-indigo-600 mb-10 p-3' >
        <img src={user.picture} className='h-5 w-5 rounded-full mr-1' alt="foto usuario"/>{user.name}</div>):(
        <>Usuario no identificado</>)}        
        <Ruta icono={faChevronCircleDown} ruta='/menu' nombre='Menú de opciones' />
        <Ruta icono={faCashRegister} ruta='/menu/ventas' nombre='Gestión de Ventas' />
        <Ruta icono={faPoll} ruta='/menu/productos' nombre='Gestión de Productos' />
        <Ruta icono={faUsers} ruta='/menu/usuarios' nombre='Gestión de Usuarios' />
      </div>
      <button onClick={()=>cerrarSesion()} className="mt-20 border border-gray-600 text-white rounded-md justify-items-center bg-blue-600 hover:bg-indigo-100">Cerrar Sesión</button>
    </nav>



  )
}
const Ruta = ({ icono, ruta, nombre }) => {
  const isActive=useActiveRoute(ruta);
  return (
    <Link to={ruta}>
      <button className={`p-1 my-2  bg-${isActive ? 'indigo':'gray'}-800 hover:bg-indigo-200 flex w-full  text-white rounded-md justify-items-center`} >
        <FontAwesomeIcon icon={icono} className="self-center mr-3" />
        {nombre}
      </button>
    </Link>
  );
};


export default Sidebar
