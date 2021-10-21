import React from 'react'
import ImagenLogo from 'components/ImagenLogo';
import PrivateRoute from 'components/PrivateRoute';

const AuthonLayout = ({children}) => {
    return (
    <PrivateRoute>
    <div className='h-screen flex flex-col items-center justify-center  bg-gradient-to-t from-blue-400 to-blue-50'>
      <div className='max-w-md w-80'>
        <ImagenLogo/>
        {children}
      </div>
    </div>
    </PrivateRoute>
  );
}

export default AuthonLayout
