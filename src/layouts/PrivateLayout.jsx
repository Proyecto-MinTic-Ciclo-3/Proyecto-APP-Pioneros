import React from 'react'

import Sidebar from 'components/Sidebar'
import SidebarResponsive from 'components/SidebarResponsive'


const PrivateLayout = ({ children }) => {
    return (
        <div className="flex flex-col md:flex-row  h-screen w-screen">
            <Sidebar/>
            <SidebarResponsive/>     
            {children}          
        </div>
    )
}

export default PrivateLayout

