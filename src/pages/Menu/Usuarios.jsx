import { faCheckSquare, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { nanoid } from 'nanoid';
import React, { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Usuarios = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [texto, setTexto] = useState(["Registrar"]);
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  useEffect(()=>{
      const obtenerUsuarios = async () => {
      const options = { method: 'GET', url: 'http://localhost:5000/usuarios' };
      await axios
        .request(options)
        .then(function (response) {
          setUsuarios(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    if(ejecutarConsulta){
      obtenerUsuarios();
      setEjecutarConsulta(false);
    }
  },[ejecutarConsulta]);

  useEffect(() => {
    //obtener lista de vehículos desde el backend
    if (mostrarTabla) {
      
      setEjecutarConsulta(true)
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTexto("Registrar Nuevo Usuario")

    } else {
      setTexto("Mostrar todos Los usuarios")

    }
  }, [mostrarTabla])


  return (
    <div className="flex flex-row">



      <div className="flex flex-col items-center ml-60">
        <h1 className="mt-5 mb-2 text-gray-900 text-2xl font-bold">Administración de Usuarios</h1>
        <div className="flex flex-row w-full  justify-between items-center">
          <div>
            <label>
              <span className="text-xl font-bold mr-1">Buscar:</span>
              <input className="rounded" placeholder="Digite el id de la venta" />
            </label>
          </div>
          <button onClick={() => { setMostrarTabla(!mostrarTabla) }} className=' cursor-pointer m-1 group relative flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 '>{texto}</button>
        </div>

        {mostrarTabla ? <TablaUsuarios listaUsuarios={usuarios} setEjecutarConsulta={setEjecutarConsulta}/> : <FormularioRegistroUsuarios setMostrarTabla={setMostrarTabla} setUsuarios={setUsuarios} listaUsuarios={usuarios} />}
        <ToastContainer
          position="top-center"
          autoClose={5000}
        />
      </div>


    </div>

  )
}
const TablaUsuarios = ({ listaUsuarios,setEjecutarConsulta }) => {


  return (
    <div>
      <h1 className="mb-2 text-gray-900 text-xl text-center font-bold">Lista de Usuarios</h1>
      
      <table className="tabla">
        <thead>
          <tr>
            <th>IdUsuario</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Vendedor</th>
            <th>Cedula</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaUsuarios.map((usuario, index) => {
            return (
              <FilaUsuario key={nanoid()} usuario={usuario} setEjecutarConsulta={setEjecutarConsulta} />
            );
          })};
        </tbody>
      </table>
          
    </div>
  )

}
const FilaUsuario = ({ 
  usuario, setEjecutarConsulta}) => {
  const [edit, setEdit] = useState(false)
  const [infoNuevoUsuario,setInfoNuevoUsuario]=useState(
    {id_usuario:usuario.id_usuario,
    nombre:usuario.nombre,
    apellido:usuario.apellido,
    cedula:usuario.cedula,
    correo:usuario.correo,
    rol:usuario.rol
    }

  )
  const actualizarUsuario= async()=>{
    //enviar la info al backend
    //console.log(usuario)
    const options = {
      method: 'PATCH',
      url: `http://localhost:5000/usuarios/editar`,
      headers: { 'Content-Type': 'application/json' },
      data: { ...infoNuevoUsuario,id:usuario._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('usurio Modificado con éxito');
        setEdit(false);
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        toast.error('Error modificando el usuario');
        console.error(error);
      });        
  }
  const eliminarUsuario=async()=>{
    const options = {
      method: 'DELETE',
      url: 'http://localhost:5000/usuarios/eliminar',
      headers: { 'Content-Type': 'application/json' },
      data: { id: usuario._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('Usuario eliminado  con éxito');
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        console.error(error);
        toast.error('Error eliminando usuario');
      });
  }


  return (
    <tr >
      {edit ? (
        <>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setInfoNuevoUsuario({...infoNuevoUsuario,id_usuario:e.target.value})}
          value={infoNuevoUsuario.id_usuario}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setInfoNuevoUsuario({...infoNuevoUsuario,fecha:e.target.value})}
          value={infoNuevoUsuario.fecha}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setInfoNuevoUsuario({...infoNuevoUsuario,producto:e.target.value})} 
          value={infoNuevoUsuario.producto}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setInfoNuevoUsuario({...infoNuevoUsuario,id_cliente:e.target.value})} 
          value={infoNuevoUsuario.id_cliente}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setInfoNuevoUsuario({...infoNuevoUsuario,vendedor:e.target.value})} 
          value={infoNuevoUsuario.vendedor}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setInfoNuevoUsuario({...infoNuevoUsuario,cantidad:e.target.value})} 
          value={infoNuevoUsuario.cantidad}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setInfoNuevoUsuario({...infoNuevoUsuario,precio:e.target.value})} 
          value={infoNuevoUsuario.precio}></input></td>
        </>
      ) : (
        <>
          <td>{usuario.id_venta}</td>
          <td>{usuario.fecha}</td>
          <td>{usuario.producto}</td>
          <td>{usuario.id_cliente}</td>
          <td>{usuario.vendedor}</td>
          <td>{usuario.cantidad}</td>
          <td>{usuario.precio}</td>
        </>
      )}

      <td className="flex flex-row justify-around">
        {edit?(
        <button type="submit" onClick={() => actualizarUsuario()}>
          <FontAwesomeIcon icon={faCheckSquare} className="text-green-600" />
        </button>
        ):(
        <button onClick={() => setEdit(!edit)} className="ml-1 text-yellow-200 hover:text-yellow-900">
          <FontAwesomeIcon icon={faEdit} />
        </button>)
        }
        <button type="submit" onClick={()=> eliminarUsuario()}  className="ml-1 text-red-500 hover:text-red-900">
          <FontAwesomeIcon icon={faTrash}  />
        </button>
      </td>
    </tr>
  )

}

const FormularioRegistroUsuarios = ({ setMostrarTabla, listaVentas, setVentas }) => {
  const form = useRef(null)
  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoUsuario = {};
    fd.forEach((value, key) => {
      nuevoUsuario[key] = value;
    });
    const options = {
      method: 'POST',
      url: 'http://localhost:5000/Usuarios/nuevo',
      headers: { 'Content-Type': 'application/json' },
      data: { id_venta: nuevoUsuario.id_venta,
       fecha: nuevoUsuario.fecha,
        producto: nuevoUsuario.producto,
         id_cliente:nuevoUsuario.id_cliente,vendedor:nuevoUsuario.vendedor, 
         cantidad:nuevoUsuario.cantidad, precio:nuevoUsuario.precio },
    };
    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('usuatio registrado con éxito');
      })
      .catch(function (error) {
        console.error(error);
        toast.error('Error creando un vehículo');
      });
    setMostrarTabla(true)
    toast.success("Usuario Registrado")
    
  }
  return (
    <div>
      <form ref={form} onSubmit={submitForm}>
        <h2 className='text-black font-bold font-sans text-xl m-1'>Registro de ventas</h2>
        <label className="flex flex-col" htmlFor="id_venta">
          Id usuario :
          <input 
          required
          name="id_venta" className="bg-gray-50 border border-gray-500  m-0.1 rounded-md " 
          type='number' 
          placeholder='id_venta' />
        </label>
        <lavel className="flex flex-col" htmlFor="fecha">
          Nombre:
          <input 
          required
          name="fecha" 
          className="bg-gray-50 border border-gray-500  m-0.1 rounded-md " 
          type='date' 
          placeholder='fecha' />
        </lavel>
        <label className="flex flex-col" htmlFor="producto">
          Apellido:
          <input
           required 
           name="producto"
           className="bg-gray-50 border border-gray-500  m-0.1 rounded-md " 
           type='text' 
           placeholder='producto' />
        </label>
        <label className="flex flex-col" htmlFor="id_cliente">
          Cedula:
          <input 
          required 
          name="id_cliente" 
          className="bg-gray-50 border border-gray-500 m-0.1 rounded-md " 
          type='number'
           placeholder='Id cliente' />
        </label>
        <label className="flex flex-col" htmlFor="vendedor">
          Correo:
          <input 
          required
           name="vendedor"
            className="bg-gray-50 border border-gray-500 m-0.1 rounded-md " 
            type='text' 
            placeholder='Nombre del vendedor' />
        </label>
        <label className="flex flex-col" htmlFor="cantidad">
          Rol:
          <input 
          required
          name="cantidad" 
          className="bg-gray-50 border border-gray-500  m-0.1 rounded-md " 
          type='text'
          placeholder='cantidad' />
        </label>
        <button 
        required 
        type="submit" 
        className='bg-blue-800 rounded-full shadow-md hover:bg-green-600 text-white p-2 mt-1 text-xl'>
          Registrar Usuario
        </button>
      </form>
    </div>
  )

}


export default Usuarios;