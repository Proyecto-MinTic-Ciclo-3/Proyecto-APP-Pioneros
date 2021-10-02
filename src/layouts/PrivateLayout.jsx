import React from 'react'
import Logo from 'media/Logo1.jpg'


const PrivateLayout = ({ children }) => {
    return (
        <div className="flex w-screen h-screen bg-gradient-to-t from-blue-500 to bg-blue-100">
            <div className=" h-full flex flex-col justify-items-start bg-gradient-to-t from-blue-200 to bg-blue-800 border-r-2 border-black">
                <img className='mx-auto h-52 w-full m-2' src={Logo} alt='Workflow' />
                <h2 className="m-1 font-bold  text-center p-2 text-xl font-sans">Menu de opciones</h2>
                <nav className=" m-3 flex justify-center items-center">
                    <ul>
                        <li className=' cursor-pointer m-1 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Inicio</li>
                        <li className='cursor-pointer   m-1 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Ventas</li>
                        <li className='cursor-pointer m-1 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Productos</li>
                        <li className='cursor-pointer m-1 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Usuarios</li>
                    </ul>
                </nav>
            </div>

            {children}
        </div>
    )
}

export default PrivateLayout

