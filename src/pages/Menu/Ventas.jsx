import { faCheckSquare, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { nanoid } from 'nanoid';
import React, { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Ventas = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [ventas, setVentas] = useState([]);
  const [texto, setTexto] = useState(["Registrar"]);
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  useEffect(()=>{
      const obtenerVentas = async () => {
      const options = { method: 'GET', url: 'http://localhost:5000/ventas' };
      await axios
        .request(options)
        .then(function (response) {
          setVentas(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    if(ejecutarConsulta){
      obtenerVentas();
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
      setTexto("Registrar  Nueva Venta")

    } else {
      setTexto("Mostrar todad las ventas")

    }
  }, [mostrarTabla])


  return (
    <div className="flex flex-row">



      <div className="flex flex-col items-center ml-60">
        <h1 className="mt-5 mb-2 text-gray-900 text-2xl font-bold">Administración de ventas</h1>
        <div className="flex flex-row w-full  justify-between items-center">
          <div>
            <label>
              <span className="text-xl font-bold mr-1">Buscar:</span>
              <input className="rounded" placeholder="Digite el id de la venta" />
            </label>
          </div>
          <button onClick={() => { setMostrarTabla(!mostrarTabla) }} className=' cursor-pointer m-1 group relative flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 '>{texto}</button>
        </div>

        {mostrarTabla ? <TablaVentas listaVentas={ventas} setEjecutarConsulta={setEjecutarConsulta}/> : <FormularioRegistroVentas setMostrarTabla={setMostrarTabla} setVentas={setVentas} listaVentas={ventas} />}
        <ToastContainer
          position="top-center"
          autoClose={5000}
        />
      </div>


    </div>

  )
}
const TablaVentas = ({ listaVentas,setEjecutarConsulta }) => {


  return (
    <div>
      <h1 className="mb-2 text-gray-900 text-xl text-center font-bold">Lista de ventas</h1>
      
      <table className="tabla">
        <thead>
          <tr>
            <th>IdVenta</th>
            <th>Fecha</th>
            <th>Producto</th>
            <th>IdCliente</th>
            <th>Vendedor</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaVentas.map((venta, index) => {
            return (
              <FilaVenta key={nanoid()} venta={venta} setEjecutarConsulta={setEjecutarConsulta} />
            );
          })}
        </tbody>
      </table>
          
    </div>
  )

}
const FilaVenta = ({ 
  venta, setEjecutarConsulta}) => {
  const [edit, setEdit] = useState(false)
  const [infoNuevaVenta,setInfoNuevaVenta]=useState(
    {id_venta:venta.id_venta,
    fecha:venta.fecha,
    producto:venta.producto,
    id_cliente:venta.id_cliente,
    vendedor:venta.vendedor,
    cantidad:venta.cantidad,
    precio: venta.precio}

  )
  const actualizarventa= async()=>{
    //enviar la info al backend
    console.log(venta)
    const options = {
      method: 'PATCH',
      url: `http://localhost:5000/ventas/editar`,
      headers: { 'Content-Type': 'application/json' },
      data: { ...infoNuevaVenta,id:venta._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('Venta modificada con éxito');
        setEdit(false);
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        toast.error('Error modificando la venta');
        console.error(error);
      });        
  }
  const eliminarVenta=async()=>{
    const options = {
      method: 'DELETE',
      url: 'http://localhost:5000/ventas/eliminar',
      headers: { 'Content-Type': 'application/json' },
      data: { id: venta._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('venta eliminada con éxito');
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        console.error(error);
        toast.error('Error eliminando la venta');
      });
  }


  return (
    <tr >
      {edit ? (
        <>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setInfoNuevaVenta({...infoNuevaVenta,id_venta:e.target.value})}
          value={infoNuevaVenta.id_venta}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setInfoNuevaVenta({...infoNuevaVenta,fecha:e.target.value})}
          value={infoNuevaVenta.fecha}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setInfoNuevaVenta({...infoNuevaVenta,producto:e.target.value})} 
          value={infoNuevaVenta.producto}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setInfoNuevaVenta({...infoNuevaVenta,id_cliente:e.target.value})} 
          value={infoNuevaVenta.id_cliente}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setInfoNuevaVenta({...infoNuevaVenta,vendedor:e.target.value})} 
          value={infoNuevaVenta.vendedor}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setInfoNuevaVenta({...infoNuevaVenta,cantidad:e.target.value})} 
          value={infoNuevaVenta.cantidad}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setInfoNuevaVenta({...infoNuevaVenta,precio:e.target.value})} 
          value={infoNuevaVenta.precio}></input></td>
        </>
      ) : (
        <>
          <td>{venta.id_venta}</td>
          <td>{venta.fecha}</td>
          <td>{venta.producto}</td>
          <td>{venta.id_cliente}</td>
          <td>{venta.vendedor}</td>
          <td>{venta.cantidad}</td>
          <td>{venta.precio}</td>
        </>
      )}

      <td className="flex flex-row justify-around">
        {edit?(
        <button type="submit" onClick={() => actualizarventa()}>
          <FontAwesomeIcon icon={faCheckSquare} className="text-green-600" />
        </button>
        ):(
        <button onClick={() => setEdit(!edit)} className="ml-1 text-yellow-200 hover:text-yellow-900">
          <FontAwesomeIcon icon={faEdit} />
        </button>)
        }
        <button type="submit" onClick={()=> eliminarVenta()}  className="ml-1 text-red-500 hover:text-red-900">
          <FontAwesomeIcon icon={faTrash}  />
        </button>
      </td>
    </tr>
  )

}

const FormularioRegistroVentas = ({ setMostrarTabla, listaVentas, setVentas }) => {
  const form = useRef(null)
  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoVenta = {};
    fd.forEach((value, key) => {
      nuevoVenta[key] = value;
    });
    const options = {
      method: 'POST',
      url: 'http://localhost:5000/ventas/nueva',
      headers: { 'Content-Type': 'application/json' },
      data: { id_venta: nuevoVenta.id_venta,
       fecha: nuevoVenta.fecha,
        producto: nuevoVenta.producto,
         id_cliente:nuevoVenta.id_cliente,vendedor:nuevoVenta.vendedor, 
         cantidad:nuevoVenta.cantidad, precio:nuevoVenta.precio },
    };
    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('Venta registrada con éxito');
      })
      .catch(function (error) {
        console.error(error);
        toast.error('Error creando un vehículo');
      });
    setMostrarTabla(true)
    toast.success("Venta Registrada")
    
  }
  return (
    <div>
      <form ref={form} onSubmit={submitForm}>
        <h2 className='text-black font-bold font-sans text-xl m-1'>Registro de ventas</h2>
        <label className="flex flex-col" htmlFor="id_venta">
          Id Venta :
          <input 
          required
          name="id_venta" className="bg-gray-50 border border-gray-500  m-0.1 rounded-md " 
          type='number' 
          placeholder='id_venta' />
        </label>
        <lavel className="flex flex-col" htmlFor="fecha">
          Fecha:
          <input 
          required
          name="fecha" 
          className="bg-gray-50 border border-gray-500  m-0.1 rounded-md " 
          type='date' 
          placeholder='fecha' />
        </lavel>
        <label className="flex flex-col" htmlFor="producto">
          Producto:
          <input
           required 
           name="producto"
           className="bg-gray-50 border border-gray-500  m-0.1 rounded-md " 
           type='text' 
           placeholder='producto' />
        </label>
        <label className="flex flex-col" htmlFor="id_cliente">
          Id Cliente:
          <input 
          required 
          name="id_cliente" 
          className="bg-gray-50 border border-gray-500 m-0.1 rounded-md " 
          type='number'
           placeholder='Id cliente' />
        </label>
        <label className="flex flex-col" htmlFor="vendedor">
          Vendedor:
          <input 
          required
           name="vendedor"
            className="bg-gray-50 border border-gray-500 m-0.1 rounded-md " 
            type='text' 
            placeholder='Nombre del vendedor' />
        </label>
        <label className="flex flex-col" htmlFor="cantidad">
          Cantidad:
          <input 
          required
          name="cantidad" 
          className="bg-gray-50 border border-gray-500  m-0.1 rounded-md " 
          type='number'
          placeholder='cantidad' />
        </label>
        <label className="flex flex-col" htmlFor="precio">
          Precio:
          <input 
          required 
          name="precio"
          className="bg-gray-50 border border-gray-500  m-01 rounded-md " 
          type='number' 
          placeholder='precio'>
          
        </input>
        </label>
        <button 
        required 
        type="submit" 
        className='bg-blue-800 rounded-full shadow-md hover:bg-green-600 text-white p-2 mt-1 text-xl'>
          Registrar Venta
        </button>
      </form>
    </div>
  )

}


export default Ventas
