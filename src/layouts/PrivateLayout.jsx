import React from 'react'

import Sidebar from 'components/Sidebar'


const PrivateLayout = ({ children }) => {
    return (
        <div className="flex w-screen h-screen bg-white">
            <Sidebar/>           
            {children}          
        </div>
    )
}

export default PrivateLayout

