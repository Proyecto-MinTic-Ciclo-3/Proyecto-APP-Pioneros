import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <>
      <h2 className="text-gray-600 flex  justify-center">Sistema de Administración</h2>
      <div className="flex flex-row items-center h-screen bg-blue-400 justify-center">

        <section className='m-10 bg-red-400 p-32 rounded-full text-white'>

          <Link to="/menu/ventas">
            <span className='font-medium text-indigo-600 hover:text-indigo-500'>Ventas</span>
          </Link>
        </section>
        <section className='m-10 bg-red-400 p-32 rounded-full text-white'>
          <Link to="/menu/productos">
            <span className='font-medium text-indigo-600 hover:text-indigo-500'>Productos</span>
          </Link>
        </section>
        <section className='m-10 bg-red-400 p-32 rounded-full text-white'>
        <Link to="/menu/usuarios">
            <span className='font-medium text-indigo-600 hover:text-indigo-500'>Usuarios</span>
        </Link>
        </section>
      </div>
    </>
  )
}

export default Menu
