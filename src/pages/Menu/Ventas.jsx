import React, { useEffect, useState, useRef} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ventasBackend = [
  {
    id_venta: 12,
    fecha: "23/03/2005",
    producto:3,
    id_cliente: 1,
    vendedor: "juan",
    cantidad: 3,
    precio: 4550

  },
  {
    id_venta: 11,
    fecha: "23/02/2005",
    producto:3,
    id_cliente: 11,
    vendedor: "juan",
    cantidad: 3,
    precio: 4550

  }
 
];
const Ventas = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [ventas, setVentas] = useState([]);
  const [texto, setTexto] = useState(["Registrar"]);
  
  useEffect(() => {
    //Obtener lista de backend
    setVentas(ventasBackend);
  }, [])

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
              <input className="rounded" placeholder="Digite el id de la venta"/>
            </label>
          </div>
          <button onClick={() => { setMostrarTabla(!mostrarTabla) }} className=' cursor-pointer m-1 group relative flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 '>{texto}</button>
        </div>
        
        {mostrarTabla ? <TablaVentas listaVentas={ventas} /> : <FormularioRegistroVentas setMostrarTabla={setMostrarTabla} setVentas={setVentas} listaVentas={ventas} />}
        <ToastContainer
          position="top-center"
          autoClose={5000}
        />
      </div>


    </div>

  )
}
const TablaVentas = ({ listaVentas}) => {
  
  return (
    <div>
            
      <h1 className="mb-2 text-gray-900 text-xl text-center font-bold">Lista de ventas</h1>
        
      <table>
        <thead className="border border-black">
          <tr>
            <th className="p-1  justify-center border border-black">IdVenta</th>
            <th className="p-1  justify-center border border-black">Fecha</th>
            <th className="p-1  justify-center border border-black">Producto</th>
            <th className="p-1  justify-center border border-black">IdCliente</th>
            <th className="p-1  justify-center border border-black">Vendedor</th>
            <th className="p-1  justify-center border border-black">Cantidad</th>
            <th className="p-1  justify-center border border-black">Precio</th>
          </tr>
        </thead>
        <tbody>
          {listaVentas.map((venta) => {
            return (
              <tr>
                <td className="border border-black text-center">{venta.id_venta}</td>
                <td className="border border-black text-center">{venta.fecha}</td>
                <td className="border border-black text-center">{venta.producto}</td>
                <td className="border border-black text-center">{venta.id_cliente}</td>
                <td className="border border-black text-center">{venta.vendedor}</td>
                <td className="border border-black text-center">{venta.cantidad}</td>
                <td className="border border-black text-center">{venta.precio}</td>
                <td><button className="ml-1 bg-green-600 text-xs p-1 rounded-full">Editar</button>
                    <button className="ml-1 bg-red-500 text-xs p-1 rounded-full">Eliminar</button>
                </td>
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
  toast.success("Venta Actualizada")
  setVentas([...listaVentas,nuevoVenta])
  }
  return (
    <div>
      <form  ref={form} onSubmit={submitForm}>
        <h2 className='text-black font-bold font-sans text-xl m-1'>Registro de ventas</h2>
        <label className="flex flex-col" htmlFor="id_venta">
          Id Venta :
          <input name="id_venta" className="bg-gray-50 border border-gray-500  m-0.1 rounded-md " type='number' placeholder='id_venta'/>
        </label>
        <lavel className="flex flex-col" htmlFor="fecha">
          Fecha:
          <input required name="fecha" className="bg-gray-50 border border-gray-500  m-0.1 rounded-md " type='date' placeholder='fecha'/>
        </lavel>
        <label className="flex flex-col" htmlFor="producto">
          Producto:
          <input required name="producto" className="bg-gray-50 border border-gray-500  m-0.1 rounded-md " type='text' placeholder='producto'/>
        </label>
        <label className="flex flex-col" htmlFor="id_cliente">
          Id Cliente:
          <input required name="id_cliente" className="bg-gray-50 border border-gray-500 m-0.1 rounded-md " type='number' placeholder='Id cliente'/>
        </label>
        <label className="flex flex-col" htmlFor="vendedor">
          Vendedor:
          <input required name="vendedor" className="bg-gray-50 border border-gray-500 m-0.1 rounded-md " type='text' placeholder='Nombre del vendedor'/>
        </label>
        <label className="flex flex-col" htmlFor="cantidad">
          Cantidad:
          <input required name="cantidad" className="bg-gray-50 border border-gray-500  m-0.1 rounded-md " type='number' placeholder='cantidad'/>
        </label>
        <label className="flex flex-col" htmlFor="precio">
          Precio:
          <input required name="precio" className="bg-gray-50 border border-gray-500  m-01 rounded-md " type='number' placeholder='precio'></input>
        </label>       
        <button required type="submit" className='bg-blue-800 rounded-full shadow-md hover:bg-green-600 text-white p-2 mt-1 text-xl'>Registrar Venta</button>
      </form>
    </div>
  )

}


export default Ventas
