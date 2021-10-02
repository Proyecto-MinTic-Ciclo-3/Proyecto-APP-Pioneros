import React from 'react'


const PrivateLayout = ({children}) => {
    return (
        <div className="flex w-screen h-screen bg-gradient-to-t from-pink-400 to bg-blue-700">
            {children}                        
        </div>
    )
}

export default PrivateLayout

