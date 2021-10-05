
import React from 'react'


const Menu = () => {
  return (
    <div className="text-center w-max ml-10">
      <h2 className="text-center font-bold text-4xl m-10 ">Sistema de Administración</h2>
      <div className=" p-20 mt-24">
        <ul className="flex flex-row  justify-between ">
          <li className="bg-indigo-700 p-20 ml-16">Ventas</li>
          <li className="bg-indigo-700 p-20 ml-16">Productos</li>
          <li className="bg-indigo-700 p-20 ml-16">Usuarios</li>
        </ul>     
        
      </div>
    </div>
  )
}

export default Menu
