import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <h2 className="text-gray-600 flex  justify-center text-3xl">
        Sistema de Administración
      </h2>
      <div className="flex flex-row items-center h-screen bg-blue-400 justify-center">
        <Link to="/menu/ventas">
          <section className="m-10 bg-red-400 p-32 rounded-3xl hover:bg-red-500">
            <span className="font-medium text-indigo-600 text-3xl hover:text-indigo-500">
              Ventas
            </span>
          </section>
        </Link>
        <Link to="/menu/productos">
          <section className="m-10 bg-red-400 p-32 rounded-3xl hover:bg-red-500">
            <span className="font-medium text-indigo-600 text-3xl hover:text-indigo-500">
              Productos
            </span>
          </section>
        </Link>
        <Link to="/menu/usuarios">
          <section className="m-10 bg-red-400 p-32 rounded-3xl hover:bg-red-500">
            <span className="font-medium text-indigo-600 text-3xl hover:text-indigo-500">
              Usuarios
            </span>
          </section>
        </Link>
      </div>
      <div className="text-gray-600 flex  justify-center text-3xl">
        Made By Pioneros Team
      </div>
    </>
  );
};

export default Menu;
