import { faCheckSquare, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { nanoid } from 'nanoid';
import React, { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

/*const productosBackend = [
  {
    id_producto: 1,
    fechaIngreso: "23/03/2021",
    nombreProducto: "Disco Estado Solido 500GB",
    proveedor: "Intel",
    cantidad: 10,
    precio: 4550,
  },
  {
    id_producto: 2,
    fechaIngreso: "23/06/2021",
    nombreProducto: "Memoria RAM 8GB(2X4)",
    proveedor: "Corsair",
    cantidad: 15,
    precio: 8590,
  },
];
const Productos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [productos, setProductos] = useState([]);
  const [texto, setTexto] = useState(["Registrar"]);

  useEffect(() => {
    //Obtener lista de backend
    setProductos(productosBackend);
  }, []);

  useEffect(() => {
    if (mostrarTabla) {
      setTexto("Registrar Producto");
    } else {
      setTexto("Mostrar Productos");
    }
  }, [mostrarTabla]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center ml-60">
        <h1 className="mt-5 mb-2 text-gray-900 text-2xl font-bold">
          Administración de Productos
        </h1>
        <div className="flex flex-row w-full  justify-between items-center">
          <div>
            <label>
              <span className="text-xl font-bold mr-1">Buscar:</span>
              <input className="rounded" placeholder="Nombre del producto" />
            </label>
          </div>
          <button
            onClick={() => {
              setMostrarTabla(!mostrarTabla);
            }}
            className=" cursor-pointer m-1 group relative flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
          >
            {texto}
          </button>
        </div>

        {mostrarTabla ? (
          <TablaProductos listaProductos={productos} />
        ) : (
          <FormularioRegistroProductos
            setMostrarTabla={setMostrarTabla}
            setProductos={setProductos}
            listaProductos={productos}
          />
        )}
        <ToastContainer position="top-center" autoClose={5000} />
      </div>
    </div>
  );
};
const TablaProductos = ({ listaProductos }) => {
  return (
    <div>
      <h1 className="mb-2 text-gray-900 text-xl text-center font-bold">
        Lista Productos
      </h1>

      <table>
        <thead className="border border-black">
          <tr>
            <th className="p-1  justify-center border border-black">
              ID Producto
            </th>
            <th className="p-1  justify-center border border-black">
              Nombre Producto
            </th>
            <th className="p-1  justify-center border border-black">
              Proveedor
            </th>
            <th className="p-1  justify-center border border-black">
              Cantidad
            </th>
            <th className="p-1  justify-center border border-black">Precio</th>
            <th className="p-1  justify-center border border-black">
              Fecha Ingreso
            </th>
          </tr>
        </thead>
        <tbody>
          {listaProductos.map((producto) => {
            return (
              <tr>
                <td className="border border-black text-center">
                  {producto.id_producto}
                </td>
                <td className="border border-black text-center">
                  {producto.nombreProducto}
                </td>
                <td className="border border-black text-center">
                  {producto.proveedor}
                </td>
                <td className="border border-black text-center">
                  {producto.cantidad}
                </td>
                <td className="border border-black text-center">
                  {producto.precio}
                </td>
                <td className="border border-black text-center">
                  {producto.fechaIngreso}
                </td>
                <td>
                  <button className="ml-1 bg-green-600 text-xs p-1 rounded-full">
                    Editar
                  </button>
                  <button className="ml-1 bg-red-500 text-xs p-1 rounded-full">
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const FormularioRegistroProductos = ({
  setMostrarTabla,
  listaProductos,
  setProductos,
}) => {
  const form = useRef(null);
  const submitForm = (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoProductos = {};
    fd.forEach((value, key) => {
      nuevoProductos[key] = value;
    });
    setMostrarTabla(true);
    toast.success("Producto Regitrado");
    setProductos([...listaProductos, nuevoProductos]);
  };
  return (
    <div>
      <form ref={form} onSubmit={submitForm}>
        <h2 className="text-black font-bold font-sans text-xl m-1">
          Registro Productos
        </h2>
        <label className="flex flex-col" htmlFor="id_producto">
          ID Producto:
          <input
            name="id_producto"
            className="bg-gray-50 border border-gray-500  m-0.1 rounded-md "
            type="number"
            placeholder="ID Producto"
          />
        </label>
        <label className="flex flex-col" htmlFor="producto">
          Nombre Producto:
          <input
            required
            name="producto"
            className="bg-gray-50 border border-gray-500  m-0.1 rounded-md "
            type="text"
            placeholder="Nombre Producto"
          />
        </label>
        <label className="flex flex-col" htmlFor="nombreProveedor">
          Proveedor: 
          <input
            required
            name="nombreProveedor"
            className="bg-gray-50 border border-gray-500 m-0.1 rounded-md "
            type="text"
            placeholder="Nombre Proveedor"
          />
        </label>
        <label className="flex flex-col" htmlFor="cantidad">
          Cantidad:
          <input
            required
            name="cantidad"
            className="bg-gray-50 border border-gray-500  m-0.1 rounded-md "
            type="number"
            placeholder="Cantidad"
          />
        </label>
        <label className="flex flex-col" htmlFor="precio">
          Precio:
          <input
            required
            name="precio"
            className="bg-gray-50 border border-gray-500  m-01 rounded-md "
            type="number"
            placeholder="Precio"
          ></input>
        </label>
        <label className="flex flex-col" htmlFor="fecha">
          Fecha Ingreso:
          <input
            required
            name="fecha"
            className="bg-gray-50 border border-gray-500  m-0.1 rounded-md "
            type="date"
            placeholder="Fecha Ingreso"
          />
        </label>                                
        <button
          required
          type="submit"
          className="bg-blue-800 rounded-full shadow-md hover:bg-green-600 text-white p-2 mt-1 text-xl"
        >
          Registrar Producto
        </button>
      </form>
    </div>
  );
};*/

const Productos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [productos, setProductos] = useState([]);
  const [texto, setTexto] = useState(["Registrar"]);
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  useEffect(()=>{
      const obtenerProductos = async () => {
      const options = { method: 'GET', url: 'http://localhost:5000/productos' };
      await axios
        .request(options)
        .then(function (response) {
          setProductos(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    if(ejecutarConsulta){
      obtenerProductos();
      setEjecutarConsulta(false);
    }
  },[ejecutarConsulta]);

  useEffect(() => {    
    if (mostrarTabla) {      
      setEjecutarConsulta(true)
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTexto("Registrar Producto");
    } else {
      setTexto("Mostrar Productos");
    }
  }, [mostrarTabla]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center ml-60">
        <h1 className="mt-5 mb-2 text-gray-900 text-2xl font-bold">
          Administración de Productos
        </h1>
        <div className="flex flex-row w-full  justify-between items-center">
          <div>
            <label>
              <span className="text-xl font-bold mr-1">Buscar:</span>
              <input className="rounded" placeholder="Nombre del producto" />
            </label>
          </div>
          <button
            onClick={() => {
              setMostrarTabla(!mostrarTabla);
            }}
            className=" cursor-pointer m-1 group relative flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
          >
            {texto}
          </button>
        </div>

        {mostrarTabla ? (
          <TablaProductos listaProductos={productos} />
        ) : (
          <FormularioRegistroProductos
            setMostrarTabla={setMostrarTabla}
            setProductos={setProductos}
            listaProductos={productos}
          />
        )}
        <ToastContainer position="top-center" autoClose={5000} />
      </div>
    </div>
  );
};

const TablaProductos = ({ listaProductos,setEjecutarConsulta }) => {


    return (
        <div>
          <h1 className="mb-2 text-gray-900 text-xl text-center font-bold">
            Lista Productos
          </h1>
      
      <table className="tabla">
        <thead>
          <tr>
            <th>ID Producto</th>
            <th>Nombre Producto</th>
            <th>Proveedor</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Fecha Ingreso</th>            
          </tr>
        </thead>
        <tbody>
          {listaProductos.map((producto, index) => {
            return (
              <FilaProducto key={nanoid()} producto={producto} setEjecutarConsulta={setEjecutarConsulta} />
            );
          })}
        </tbody>
      </table>
          
    </div>
  )

}
const FilaProducto = ({ 
  producto, setEjecutarConsulta}) => {
  const [edit, setEdit] = useState(false)
  const [infoNuevoProducto,setinfoNuevoProducto]=useState(
    {id_producto:producto.id_producto,
    nombreProducto:producto.nombreProducto,
    proveedor:producto.proveedor,        
    cantidad:producto.cantidad,
    precio: producto.precio,
    fechaIngreso:producto.fechaIngreso
}

  )
  const actualizarProducto= async()=>{        
    const options = {
      method: 'PATCH',
      url: `http://localhost:5000/productos/editar`,
      headers: { 'Content-Type': 'application/json' },
      data: { ...infoNuevoProducto,id:producto._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('Producto modificado con éxito');
        setEdit(false);
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        toast.error('Error modificando el producto');
        console.error(error);
      });        
  }
  const eliminarProducto=async()=>{
    const options = {
      method: 'DELETE',
      url: 'http://localhost:5000/productos/eliminar',
      headers: { 'Content-Type': 'application/json' },
      data: { id: producto._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('Producto eliminado con éxito');
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        console.error(error);
        toast.error('Error eliminando el producto');
      });
  }


  return (
    <tr >
      {edit ? (
        <>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setinfoNuevoProducto({...infoNuevoProducto,id_producto:e.target.value})}
          value={infoNuevoProducto.id_producto}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setinfoNuevoProducto({...infoNuevoProducto,nombreProducto:e.target.value})}
          value={infoNuevoProducto.nombreProducto}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setinfoNuevoProducto({...infoNuevoProducto,proveedor:e.target.value})} 
          value={infoNuevoProducto.proveedor}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setinfoNuevoProducto({...infoNuevoProducto,cantidad:e.target.value})} 
          value={infoNuevoProducto.cantidad}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setinfoNuevoProducto({...infoNuevoProducto,precio:e.target.value})} 
          value={infoNuevoProducto.precio}></input></td>
          <td><input
          className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-20" 
          type="text" 
          onChange={(e)=>setinfoNuevoProducto({...infoNuevoProducto,fechaIngreso:e.target.value})} 
          value={infoNuevoProducto.fechaIngreso}></input></td>        
        </>
      ) : (
        <>
          <td>{producto.id_producto}</td>
          <td>{producto.nombreProducto}</td>
          <td>{producto.proveedor}</td>
          <td>{producto.cantidad}</td>
          <td>{producto.precio}</td>
          <td>{producto.fechaIngreso}</td>          
        </>
      )}

      <td className="flex flex-row justify-around">
        {edit?(
        <button type="submit" onClick={() => actualizarProducto()}>
          <FontAwesomeIcon icon={faCheckSquare} className="text-green-600" />
        </button>
        ):(
        <button onClick={() => setEdit(!edit)} className="ml-1 text-yellow-200 hover:text-yellow-900">
          <FontAwesomeIcon icon={faEdit} />
        </button>)
        }
        <button type="submit" onClick={()=> eliminarProducto()}  className="ml-1 text-red-500 hover:text-red-900">
          <FontAwesomeIcon icon={faTrash}  />
        </button>
      </td>
    </tr>
  )

}

const FormularioRegistroProductos = ({
    setMostrarTabla,
    listaProductos,
    setProductos,
  }) => {
    const form = useRef(null);
    const submitForm = async (e) => {
      e.preventDefault();
      const fd = new FormData(form.current);
  
      const nuevoProductos = {};
      fd.forEach((value, key) => {
        nuevoProductos[key] = value;
      });
      const options = {
        method: 'POST',
        url: 'http://localhost:5000/productos/nuevo',
        headers: { 'Content-Type': 'application/json' },
        data: { id_producto: nuevoProductos.id_producto,
            nombreProducto: nuevoProductos.nombreProducto,
            proveedor: nuevoProductos.proveedor,
            cantidad: nuevoProductos.cantidad,
            precio: nuevoProductos.precio,
            fechaIngreso: nuevoProductos.fechaIngreso
      },
    };await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('Producto registrado con éxito');
      })
      .catch(function (error) {
        console.error(error);
        toast.error('Error registrando el producto');
      });
    setMostrarTabla(true)
    toast.success("Producto Registrado")
    
  }
  return (
    <div>
      <form ref={form} onSubmit={submitForm}>
        <h2 className="text-black font-bold font-sans text-xl m-1">
          Registro Productos
        </h2>
        <label className="flex flex-col" htmlFor="id_producto">
          ID Producto:
          <input
            name="id_producto"
            className="bg-gray-50 border border-gray-500  m-0.1 rounded-md "
            type="number"
            placeholder="ID Producto"
          />
        </label>
        <label className="flex flex-col" htmlFor="producto">
          Nombre Producto:
          <input
            required
            name="producto"
            className="bg-gray-50 border border-gray-500  m-0.1 rounded-md "
            type="text"
            placeholder="Nombre Producto"
          />
        </label>
        <label className="flex flex-col" htmlFor="nombreProveedor">
          Proveedor: 
          <input
            required
            name="nombreProveedor"
            className="bg-gray-50 border border-gray-500 m-0.1 rounded-md "
            type="text"
            placeholder="Nombre Proveedor"
          />
        </label>
        <label className="flex flex-col" htmlFor="cantidad">
          Cantidad:
          <input
            required
            name="cantidad"
            className="bg-gray-50 border border-gray-500  m-0.1 rounded-md "
            type="number"
            placeholder="Cantidad"
          />
        </label>
        <label className="flex flex-col" htmlFor="precio">
          Precio:
          <input
            required
            name="precio"
            className="bg-gray-50 border border-gray-500  m-01 rounded-md "
            type="number"
            placeholder="Precio"
          ></input>
        </label>
        <label className="flex flex-col" htmlFor="fecha">
          Fecha Ingreso:
          <input
            required
            name="fecha"
            className="bg-gray-50 border border-gray-500  m-0.1 rounded-md "
            type="date"
            placeholder="Fecha Ingreso"
          />
        </label>                                
        <button
          required
          type="submit"
          className="bg-blue-800 rounded-full shadow-md hover:bg-green-600 text-white p-2 mt-1 text-xl"
        >
          Registrar Producto
        </button>
      </form>
    </div>
  );

}


export default Productos;