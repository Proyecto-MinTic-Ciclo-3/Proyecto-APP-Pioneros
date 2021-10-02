import React, { useEffect, useState, useRef} from 'react'
import Logo from 'media/Logo1.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ventasBackend = [
  {
    id_venta: 2,
    fecha: 2,
    producto: 3,
    id_cliente: 3,
    vendedor: "juan",
    cantidad: 3,
    precio: 455

  },
  {
    id_venta: 1,
    fecha: 2,
    producto: 3,
    id_cliente: 3,
    vendedor: "juan",
    cantidad: 3,
    precio: 455

  },
  {
    id_venta: 1,
    fecha: 2,
    producto: 3,
    id_cliente: 3,
    vendedor: "juan",
    cantidad: 3,
    precio: 455

  },

];
const Ventas = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [ventas, setVentas] = useState([]);
  const [texto, setTexto] = useState("Registrar");
  useEffect(() => {
    //Obtener lista de backend
    setVentas(ventasBackend);
  }, [])

  useEffect(() => {
    if (mostrarTabla) {
      setTexto("Registrar")
    } else {
      setTexto("Ventas")
    }
  }, [mostrarTabla])

  return (
    <div className="flex flex-row">
      <div className=" h-full flex flex-col justify-items-start bg-gradient-to-t from-blue-800 to bg-pink-800">
        <img className='mx-auto h-52 w-full m-2' src={Logo} alt='Workflow' />
        <h2 className="m-1 font-bold  text-center p-2 ">Menu de opciones</h2>
        <nav className=" m-3 flex justify-center items-center">
          <ul>
            <li onClick={() => { setMostrarTabla(!mostrarTabla) }} className=' cursor-pointer m-1 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>{texto}</li>
            <li className='cursor-pointer   m-1 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Actualizar</li>
            <li className='cursor-pointer m-1 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Eliminar</li>
            <li className='cursor-pointer m-1 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Buscar</li>
          </ul>
        </nav>
      </div>

      <div className="flex flex-col items-center ml-60">
        <h1 className="mt-5 mb-2 text-gray-900 text-2xl">Administración de ventas</h1>
        {mostrarTabla ? <TablaVentas listaVentas={ventas} /> : <FormularioRegistroVentas setMostrarTabla={setMostrarTabla} setVentas={setVentas} listaVentas={ventas} />}
        <ToastContainer
          position="top-center"
          autoClose={5000}
        />
      </div>


    </div>

  )
}
const TablaVentas = ({ listaVentas }) => {
  
  return (
    <div>
      <h1 className="mb-2 text-gray-900 text-2xl text-center font-bold">Lista de ventas</h1>
        
      <table className="border border-black">
        <thead className="border border-black">
          <tr>
            <th className="p-2 ">IdVenta</th>
            <th className="p-2 ">Fecha</th>
            <th className="p-2 ">NombreCliente</th>
            <th className="p-2 ">IdCliente</th>
            <th className="p-2 ">Vendedor</th>
            <th className="p-2 ">Cantidad</th>
            <th className="p-2 ">Precio</th>
          </tr>
        </thead>
        <tbody>
          {listaVentas.map((venta) => {
            return (
              <tr>
                <td>{venta.id_venta}</td>
                <td>{venta.fecha}</td>
                <td>{venta.producto}</td>
                <td>{venta.id_cliente}</td>
                <td>{venta.vendedor}</td>
                <td>{venta.cantidad}</td>
                <td>{venta.precio}</td>
              </tr>
            );
          })};


        </tbody>
      </table>
  </div>
  )

}

const FormularioRegistroVentas = ({setMostrarTabla,listaVentas,setVentas}) => {
  const form=useRef(null)
  const submitForm=(e)=>{
    e.preventDefault();
    const fd= new FormData(form.current);

    const nuevoVenta = {};
    fd.forEach((value, key) => {
      nuevoVenta[key] = value;
    });
  setMostrarTabla(true)
  toast.success("Venta Regitrada")
  setVentas([...listaVentas,nuevoVenta])
  }
  return (
    <div>
      <form  ref={form} onSubmit={submitForm}  className='flex flex-col '>
        <h2 className='text-black font-bold font-serif text-2xl m-1'>Registro de ventas</h2>
        <label className="flex flex-col" htmlFor="id_venta">
          Id Venta :
          <input name="id_venta" className="bg-gray-50 border border-gray-500 p-2 m-0.1 rounded-md " type='number' placeholder='id_venta'/>
        </label>
        <lavel className="flex flex-col" htmlFor="fecha">
          Fecha:
          <input required name="fecha" className="bg-gray-50 border border-gray-500 p-2 m-0.1 rounded-md " type='fecha' placeholder='fecha'/>
        </lavel>
        <label className="flex flex-col" htmlFor="nombre_cliente">
          Nombre Cliente:
          <input required name="nombre_cliente" className="bg-gray-50 border border-gray-500 p-2 m-0.1 rounded-md " type='text' placeholder='Nombre del cliente'/>
        </label>
        <label className="flex flex-col" htmlFor="id_cliente">
          Id Cliente:
          <input required name="id_cliente" className="bg-gray-50 border border-gray-500 p-2 m-0.1 rounded-md " type='number' placeholder='Id cliente'/>
        </label>
        <label className="flex flex-col" htmlFor="vendedor">
          Vendedor:
          <input required name="vendedor" className="bg-gray-50 border border-gray-500 p-2 m-0.1 rounded-md " type='text' placeholder='Nombre del vendedor'/>
        </label>
        <label className="flex flex-col" htmlFor="cantidad">
          Cantidad:
          <input required name="cantidad" className="bg-gray-50 border border-gray-500 p-2 m-0.1 rounded-md " type='number' placeholder='cantidad'/>
        </label>
        <label className="flex flex-col" htmlFor="precio">
          Precio:
          <input required name="precio" className="bg-gray-50 border border-gray-500 p-2 m-01 rounded-md " type='number' placeholder='precio'></input>
        </label>       
        <button required type="submit" className='bg-green-300 rounded-full shadow-md hover:bg-green-600 text-white p-2 mt-1'>Registrar Venta</button>
      </form>
    </div>
  )

}
export default Ventas
