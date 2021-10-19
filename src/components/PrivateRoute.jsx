import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react/cjs/react.development';
import ReactLoading from 'react-loading';

const PrivateRoute = ({children}) => {
    
    const {isAuthenticated,isLoading,loginWithRedirect, getAccessTokenSilently}=useAuth0();
    useEffect(()=>{
        const fetchAuth0Token = async ()=>{
            const accessToken= await getAccessTokenSilently({
            audience:'Backend-Api-Autenticacion-Pioneros-Misiontic'
        });
        localStorage.setItem('token', accessToken)
            
        };
        if(isAuthenticated){
            fetchAuth0Token();
        }
        
    }, [isAuthenticated,getAccessTokenSilently]);

    if (isLoading)  return <div className="flex flex-col items-center h-screen">
        <ReactLoading type="spokes" color='#2014DC' height={500} with={300}  className="flex flex-col justify-center"/></div>
    if (!isAuthenticated){
        return loginWithRedirect();
    }
    return <>{children}</>


    //return isAuthenticated? <>{children}</>:<div>No estas autorizado</div>    
}

export default PrivateRoute
