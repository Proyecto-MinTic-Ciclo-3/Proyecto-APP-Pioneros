import ImagenLogo from 'components/ImagenLogo'
import Index from 'pages/Index'
import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-gray-600 flex  justify-center m-2 text-3xl font-bold p-3">Sistema de Administración</h2>
      <div className="flex  items-center bg-blue-400 h-full justify-between">
        <ul className="flex flex-row w-full m-20 p-10 justify-between bg-indigo-500">
          <li className="bg-indigo-700 rounded-md p-20">Ventas</li>
          <li className="bg-indigo-700 rounded-md p-20">Productos</li>
          <li className="bg-indigo-700 rounded-md p-20">Usuarios</li>
        </ul>     
        
      </div>
    </div>
  )
}

export default Menu
