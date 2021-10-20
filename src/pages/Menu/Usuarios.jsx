import { faCheckSquare, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { nanoid } from 'nanoid';
import React, { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { obtenerUsuarios,crearUsuario, editarUsuario, deleteUsuario} from 'utils/api';
import ReactLoading from 'react-loading';




const Usuarios = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [texto, setTexto] = useState(["Registrar"]);
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const [loading, setLoading]= useState(false)
  useEffect(() => {
    const fetchUsuarios=async()=>{
      
      setLoading(true)
      await obtenerUsuarios(
        (response)=>{setUsuarios(response.data); setEjecutarConsulta(false); setLoading(false)},
        (error)=>{console.error(error); setLoading(false)}
      );
    }
    if (ejecutarConsulta) {
      
      fetchUsuarios();
            
    }
  }, [ejecutarConsulta]);

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
        <button
         onClick={() => { setMostrarTabla(!mostrarTabla) }} 
         className='cursor-pointer m-1  py-2 px-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 self-end'>
        {texto}
        </button>      

        {mostrarTabla ? <TablaUsuarios loading={loading} listaUsuarios={usuarios} setEjecutarConsulta={setEjecutarConsulta}/> : <FormularioRegistroUsuarios setMostrarTabla={setMostrarTabla} setUsuarios={setUsuarios} listaUsuarios={usuarios} />}
        <ToastContainer
          position="top-center"
          autoClose={5000}
        />
      </div>


    </div>

  )
}
const TablaUsuarios = ({ listaUsuarios,setEjecutarConsulta,loading}) => {
  const [busqueda, setBusqueda] = useState('');
  const [usuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);

  useEffect(() => {
    setUsuariosFiltrados(
      listaUsuarios.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaUsuarios]);



  return (
    <div>
      <div>
        <label>
          <span className="text-xl font-bold mr-1">Buscar:</span>
          <input
            value={busqueda}
            type="search"
            onChange={(e) => setBusqueda(e.target.value)}
            className="rounded focus: outline-none border border-gray-600"
            placeholder="Digite el id del usuario" />
        </label>
      </div>
      <h1 className="mb-2 text-gray-900 text-xl text-center font-bold">Lista de Usuarios</h1>
      {loading? (<ReactLoading type="spokes" color='#abc123' height={500} with={300}/>):(      
      <table className="tabla">
        <thead>
          <tr>
            <th>IdUsuario</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cedula</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((usuario, index) => {
            return (
              <FilaUsuario key={nanoid()} usuario={usuario} setEjecutarConsulta={setEjecutarConsulta} />
            );
          })}
        </tbody>
      </table>)};
          
    </div>
  )

}
const FilaUsuario = ({ 
  usuario, setEjecutarConsulta}) => {
  const [edit, setEdit] = useState(false)
  const [infoNuevoUsuario,setInfoNuevoUsuario]=useState(
    {
    _id:usuario._id,
    id_usuario:usuario.id_usuario,
    nombre:usuario.nombre,
    apellido:usuario.apellido,
    cedula:usuario.cedula,
    correo:usuario.correo,
    rol:usuario.rol
    });
  const actualizarUsuario= async()=>{
    
    await editarUsuario(
      usuario._id,
    {
      id_usuario:infoNuevoUsuario.id_usuario,
      nombre:infoNuevoUsuario.nombre,
      apellido:infoNuevoUsuario.apellido,
      cedula:infoNuevoUsuario.cedula,
      correo:infoNuevoUsuario.correo,
      rol:infoNuevoUsuario.rol
    },     
    (response)=>{
     console.log(response.data)
     toast.success('Usuario actualizado')
     setEdit(false)
     setEjecutarConsulta(true)
    },
    (error)=>{
      console.error(error);
      toast.error('<Error al actualizar Usuario')
    }); 
       
  };
  const eliminarUsuario=async()=>{
    await deleteUsuario(usuario._id,
    (response)=>{
      console.log(response.data);
      toast.success('usuario eliminado con éxito');
      setEjecutarConsulta(true);
    },
    (error)=>{
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
          onChange={(e)=>setInfoNuevoUsuario({...infoNuevoUsuario,nombre:e.target.value})}
          value={infoNuevoUsuario.nombre}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setInfoNuevoUsuario({...infoNuevoUsuario,apellido:e.target.value})} 
          value={infoNuevoUsuario.apellido}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setInfoNuevoUsuario({...infoNuevoUsuario,cedula:e.target.value})} 
          value={infoNuevoUsuario.cedula}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setInfoNuevoUsuario({...infoNuevoUsuario,correo:e.target.value})} 
          value={infoNuevoUsuario.correo}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setInfoNuevoUsuario({...infoNuevoUsuario,rol:e.target.value})} 
          value={infoNuevoUsuario.rol}></input></td>
          
        </>
      ) : (
        <>
          <td>{usuario.id_usuario}</td>
          <td>{usuario.nombre}</td>
          <td>{usuario.apellido}</td>
          <td>{usuario.cedula}</td>
          <td>{usuario.correo}</td>
          <td>{usuario.rol}</td>          
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

const FormularioRegistroUsuarios = ({ setMostrarTabla}) => {
  const form = useRef(null)
  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoUsuario = {};
    fd.forEach((value, key) => {
      nuevoUsuario[key] = value;
    });

    await crearUsuario({
       id_usuario: nuevoUsuario.id_usuario,
       nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
         cedula:nuevoUsuario.cedula,
         correo:nuevoUsuario.correo, 
        rol:nuevoUsuario.rol },
        (response)=>{
          console.log(response.data)
          toast.success("Usuario Creado Exitosamente")
        },
        (error)=>{
          console.error(error);
          toast.error("Error al crear el usuario")
        }
        )   
    
    setMostrarTabla(true)
    
    
  }
  return (
    <div>
      <form ref={form} onSubmit={submitForm}>
        <h2 className='text-black font-bold font-sans text-xl m-1'>Registro de ventas</h2>
        <label className="flex flex-col" htmlFor="id_usuario">
          Id usuario :
          <input 
          required
          name="id_usuario" className="bg-gray-50 border border-gray-500  m-0.1 rounded-md " 
          type='number' 
          placeholder='id_usuario' autocomplete="off" />
        </label>
        <lavel className="flex flex-col" htmlFor="nombre">
          Nombre:
          <input 
          required
          name="nombre" 
          className="bg-gray-50 border border-gray-500  m-0.1 rounded-md " 
          type='text' 
          placeholder='nombre'  autocomplete="off"/>
        </lavel>
        <label className="flex flex-col" htmlFor="apellido">
          Apellido:
          <input
           required 
           name="apellido"
           className="bg-gray-50 border border-gray-500  m-0.1 rounded-md " 
           type='text' 
           placeholder='apellido' autocomplete="off" />
        </label>
        <label className="flex flex-col" htmlFor="cedula">
          Cedula:
          <input 
          required 
          name="cedula" 
          className="bg-gray-50 border border-gray-500 m-0.1 rounded-md " 
          type='number'
           placeholder='cédula' autocomplete="off" />
        </label>
        <label className="flex flex-col" htmlFor="Correo">
          Correo:
          <input 
          required
           name="correo"
            className="bg-gray-50 border border-gray-500 m-0.1 rounded-md " 
            type='text' 
            placeholder='correo electronico' autoComplete="off" />
        </label>
        <label className="flex flex-col" htmlFor="rol">
          Rol:
          <input 
          required
          name="rol" 
          className="bg-gray-50 border border-gray-500  m-0.1 rounded-md " 
          type='text'
          placeholder='rol' autocomplete="off" />
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