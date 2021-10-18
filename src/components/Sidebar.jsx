import React from 'react'
import ImagenLogo from './ImagenLogo'
import { Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCashRegister, faChevronCircleDown, faPoll,  faUsers } from '@fortawesome/free-solid-svg-icons'
import useActiveRoute from 'hooks/useActiveRoute'
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = () => {
  const { logout } = useAuth0();
  return (
    <nav className="hidden lg:flex md:flex w-72  flex-col   bg-gradient-to-t from-gray-500 to-white p-4 ">

      <Link to="/">
        <ImagenLogo />
      </Link>
      <div className='my-4'>
        <Ruta icono={faChevronCircleDown} ruta='/menu' nombre='Menú de opciones' />
        <Ruta icono={faCashRegister} ruta='/menu/ventas' nombre='Gestión de Ventas' />
        <Ruta icono={faPoll} ruta='/menu/productos' nombre='Gestión de Productos' />
        <Ruta icono={faUsers} ruta='/menu/usuarios' nombre='Gestión de Usuarios' />
      </div>
      <button onClick={()=>logout({ returnTo: window.location.origin })}>Cerrar Sesión</button>
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
