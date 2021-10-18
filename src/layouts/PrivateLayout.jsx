import React from 'react'

import Sidebar from 'components/Sidebar'
import SidebarResponsive from 'components/SidebarResponsive'
import PrivateRoute from 'components/PrivateRoute';


const PrivateLayout = ({ children }) => {
    return (
        <PrivateRoute>        
            <div className="flex flex-col md:flex-row  h-screen w-screen">
            <Sidebar/>
            <SidebarResponsive/>     
            {children}          
            </div>
        </PrivateRoute>  
       
    )
}

export default PrivateLayout

