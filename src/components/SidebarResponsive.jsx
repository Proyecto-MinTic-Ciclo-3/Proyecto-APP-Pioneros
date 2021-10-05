import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react/cjs/react.development'
import { Link } from 'react-router-dom'
const SidebarResponsive = () => {
    const [mostrarNav,setMostrarNav]=useState(false);
    return (
        <div className="md:hidden" onClick={()=>{setMostrarNav(!mostrarNav)}} >
                <FontAwesomeIcon icon={faBars} className="hover:bg-yellow-200"/>
            {mostrarNav &&( 
            <ul className="bg-gray-900">
                <ResponsiveRoute ruta="/menu/ventas" nombre="Ventas"/>
                <ResponsiveRoute ruta="/menu/productos" nombre="Productos"/>
                <ResponsiveRoute ruta="/menu/usuarios" nombre="Usuarios"/>
                
            </ul>
            )}
        </div>     
    )
}
const ResponsiveRoute=({ruta,nombre})=>{
    return(
        <Link to={ruta}>
            <li className="text-gray-100">{nombre}</li>
        </Link>
    )
}

export default SidebarResponsive
