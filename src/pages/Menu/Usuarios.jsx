import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const usuariosBackend = [
  {
    id_Usuario: 1,
    Rol: "Vendedor",
    nombreUsuario: "Juanito Juanito",
    apellido: "Ramirez Ramirez",
    cedula: 1000855656,
    correo: "juanitora@gmail.com",
  },
  {
    id_Usuario: 2,
    Rol: "Vendedor",
    nombreUsuario: "Pepito Pepito",
    apellido: "Perez Perez",
    cedula: 1000855656,
    correo: "pepitope@gmail.com",
  },
];
const Usuarios = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [Usuarios, setUsuarios] = useState([]);
  const [texto, setTexto] = useState(["Registrar"]);

  useEffect(() => {
    //Obtener lista de backend
    setUsuarios(usuariosBackend);
  }, []);

  useEffect(() => {
    if (mostrarTabla) {
      setTexto("Registrar Usuario");
    } else {
      setTexto("Mostrar Usuario");
    }
  }, [mostrarTabla]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center ml-60">
        <h1 className="mt-5 mb-2 text-gray-900 text-2xl font-bold">
          Administración de Usuarios
        </h1>
        <div className="flex flex-row w-full  justify-between items-center">
          <div>
            <label>
              <span className="text-xl font-bold mr-1">Buscar:</span>
              <input className="rounded" placeholder="Nombre de Usuario" />
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
          <TablaUsuarios listaUsuarios={Usuarios} />
        ) : (
          <FormularioRegistroUsuarios
            setMostrarTabla={setMostrarTabla}
            setUsuarios={setUsuarios}
            listaUsuarios={Usuarios}
          />
        )}
        <ToastContainer position="top-center" autoClose={5000} />
      </div>
    </div>
  );
};
const TablaUsuarios = ({ listaUsuarios }) => {
  return (
    <div>
      <h1 className="mb-2 text-gray-900 text-xl text-center font-bold">
        Lista Usuarios
      </h1>

      <table>
        <thead className="border border-black">
          <tr>
            <th className="p-1  justify-center border border-black">
              ID Usuario
            </th>
            <th className="p-1  justify-center border border-black">
              Nombres 
            </th>
            <th className="p-1  justify-center border border-black">
              Apellidos
            </th>
            <th className="p-1  justify-center border border-black">
               Documento
            </th>
            <th className="p-1  justify-center border border-black">
              Correo
              </th>
            <th className="p-1  justify-center border border-black">
              Rol
            </th>
          </tr>
        </thead>
        <tbody>
          {listaUsuarios.map((Usuario) => {
            return (
              <tr>
                <td className="border border-black text-center">
                  {Usuario.id_Usuario}
                </td>
                <td className="border border-black text-center">
                  {Usuario.nombreUsuario}
                </td>
                <td className="border border-black text-center">
                  {Usuario.apellido}
                </td>
                <td className="border border-black text-center">
                  {Usuario.cedula}
                </td>
                <td className="border border-black text-center">
                  {Usuario.correo}
                </td>
                <td className="border border-black text-center">
                  {Usuario.Rol}
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

const FormularioRegistroUsuarios = ({
  setMostrarTabla,
  listaUsuarios,
  setUsuarios,
}) => {
  const form = useRef(null);
  const submitForm = (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoUsuarios = {};
    fd.forEach((value, key) => {
      nuevoUsuarios[key] = value;
    });
    setMostrarTabla(true);
    toast.success("Usuario Registrado");
    setUsuarios([...listaUsuarios, nuevoUsuarios]);
  };
  return (
    <div>
      <form ref={form} onSubmit={submitForm}>
        <h2 className="text-black font-bold font-sans text-xl m-1">
          Rol
        </h2>
        <label className="flex flex-col" htmlFor="id_Usuario">
          ID Usuario:
          <input
            name="id_Usuario"
            className="bg-gray-50 border border-gray-500  m-0.1 rounded-md "
            type="number"
            placeholder="ID Usuario"
          />
        </label>
        <label className="flex flex-col" htmlFor="Usuario">
          Nombre Usuario:
          <input
            required
            name="Usuario"
            className="bg-gray-50 border border-gray-500  m-0.1 rounded-md "
            type="text"
            placeholder="Nombre Usuario"
          />
        </label>
        <label className="flex flex-col" htmlFor="apellido">
          Apellido: 
          <input
            required
            name="Apellido"
            className="bg-gray-50 border border-gray-500 m-0.1 rounded-md "
            type="text"
            placeholder="Apellido"
          />
        </label>
        <label className="flex flex-col" htmlFor="Cedula">
          Cedula:
          <input
            required
            name="cedula"
            className="bg-gray-50 border border-gray-500  m-0.1 rounded-md "
            type="number"
            placeholder="Cedula"
          />
        </label>
        <label className="flex flex-col" htmlFor="Correo">
          Correo:
          <input
            required
            name="correo"
            className="bg-gray-50 border border-gray-500  m-01 rounded-md "
            type="number"
            placeholder="Correo"
          ></input>
        </label>
        <label className="flex flex-col" htmlFor="fecha">
          Rol:
          <input
            required
            name="fecha"
            className="bg-gray-50 border border-gray-500  m-0.1 rounded-md "
            type="date"
            placeholder="Rol"
          />
        </label>                                
        <button
          required
          type="submit"
          className="bg-blue-800 rounded-full shadow-md hover:bg-green-600 text-white p-2 mt-1 text-xl"
        >
          Rol
        </button>
      </form>
    </div>
  );
};

export default Usuarios;

  