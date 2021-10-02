import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const productosBackend = [
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
};

export default Productos;
