import axios from 'axios';
console.log(localStorage.getItem('token'))
const getToken=()=>{
  return `Bearer ${localStorage.getItem('token')}`
  
}

//API VENTAS

export const obtenerVentas = async (successCallback,errorCallback) => {
    const options = { method: 'GET', 
    url: 'http://localhost:5000/ventas',
    headers:{
      Authorization:getToken()
    }
   };
    await axios
      .request(options)
      .then(successCallback).catch(errorCallback);
    
  };

export const crearVenta = async (data,successCallback,errorCallback)=>{
    const options = {
        method: 'POST',
        url:'http://localhost:5000/ventas',
        headers: { 'Content-Type': 'application/json',Authorization:getToken() },
        data
    }
    await axios
    .request(options)
    .then(successCallback)
    .catch(errorCallback);


};

export const editarVenta=async(id,data,successCallback,errorCallback)=>{
    const options={
        method: 'PATCH',
        url: `http://localhost:5000/ventas/${id}/`,
        headers: { 'Content-Type': 'application/json', Authorization:getToken()},
        data
      };
    await axios
    .request(options)
    .then(successCallback)
    .catch(errorCallback);
}

export const deleteVenta=async(data,successCallback,errorCallback)=>{
    const options={
        method: 'DELETE',
      url: `http://localhost:5000/ventas/${data}`,
      headers: { 'Content-Type': 'application/json', Authorization:getToken() },      
    }
    await axios
    .request(options)
    .then(successCallback)
    .catch(errorCallback)

}

//API usuarios

export const obtenerUsuarios= async (successCallback,errorCallback) => {
  const options = { method: 'GET', 
  url: 'http://localhost:5000/usuarios',
  headers:{
    Authorization:getToken()
  }
 };
  await axios
    .request(options)
    .then(successCallback).catch(errorCallback);
  
};

export const crearUsuario = async (data,successCallback,errorCallback)=>{
  const options = {
      method: 'POST',
      url:'http://localhost:5000/usuarios',
      headers: { 'Content-Type': 'application/json',Authorization:getToken() },
      data
  }
  await axios
  .request(options)
  .then(successCallback)
  .catch(errorCallback);
};

export const editarUsuario=async(id,data,successCallback,errorCallback)=>{
  const options={
      method: 'PATCH',
      url: `http://localhost:5000/usuarios/${id}/`,
      headers: { 'Content-Type': 'application/json', Authorization:getToken()},
      data
    };
  await axios
  .request(options)
  .then(successCallback)
  .catch(errorCallback);
}
export const deleteUsuario=async(data,successCallback,errorCallback)=>{
  const options={
    method: 'DELETE',
    url: `http://localhost:5000/usuarios/${data}`,
    headers: { 'Content-Type': 'application/json', Authorization:getToken() },      
  }
  await axios
  .request(options)
  .then(successCallback)
  .catch(errorCallback)

}

