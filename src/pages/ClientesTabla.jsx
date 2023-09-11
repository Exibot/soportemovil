import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const ClientesTabla = () => {
    const [clientes, setClientes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editedCliente, setEditedCliente] = useState({
        id: null,
        nombre: '',
        RUT: '',
        giro: '',
        telefono: '',
        web: '',
        email: '',
    });

    useEffect(() => {
        axios.get('http://localhost:3000/api/clientes')
            .then((response) => {
                setClientes(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener los datos de los clientes: ', error);
            });
    }, []);

    const handleEliminarCliente = (id) => {
        axios.delete(`http://localhost:3000/api/clientes/${id}`)
        .then(() => {
            //Estoy actualizando la lista de clientes despues de la eliminación 
            setClientes(clientes.filter((cliente) => cliente.id !== id));
        })
        .catch((error) => {
            console.error('Error al eliminar el cliente: ', error);
        });
    };

    const handleEditarCliente = (cliente) => {
        setEditedCliente(cliente);
        setModalVisible(true);
    }

    const handleGuardarCambios = () => {
        axios.put(`http://localhost:3000/api/clientes/${editedCliente.id}`, editedCliente)
        .then(() => {
            setClientes(clientes.map((cliente) => 
            cliente.id === editedCliente.id ? editedCliente : cliente
            ));
            setModalVisible(false);
        })
        .catch((error) => {
            console.error('Error al actualizar el cliente: ', error);
        });
    };

    const handleCancelar = () => {
        setModalVisible(false);

        setEditedCliente({
            id: null, 
            nombre: '',
            RUT: '',
            giro: '',
            telefono: '',
            web: '',
            email: '',
        });
    };
    
  return (
    <div className="">
      <table className="w-3/4 mx-auto text-white table-auto">
        <thead className="bg-green-400 text-center">
          <tr>
            <th className="border border-green-400">Nombre</th>
            <th className="border border-green-400">RUT</th>
            <th className="border border-green-400">Giro</th>
            <th className="border border-green-400">Teléfono</th>
            <th className="border border-green-400">Web</th>
            <th className="border border-green-400">Email</th>
            <th className="border border-green-400">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td className="border border-green-400">{cliente.nombre}</td>
              <td className="border border-green-400">{cliente.RUT}</td>
              <td className="border border-green-400">{cliente.giro}</td>
              <td className="border border-green-400">{cliente.telefono}</td>
              <td className="border border-green-400">{cliente.web}</td>
              <td className="border border-green-400">{cliente.email}</td>
              <td className="border border-green-400">
              <button
                  className="bg-blue-300 hover:bg-blue-400 transition duration-900 rounded px-2 py-1 mx-1"
                  onClick={() => handleEditarCliente(cliente)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-300 hover:bg-red-400 transition duration-900 rounded px-2 py-1 mx-1"
                  onClick={() => handleEliminarCliente(cliente.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-90  flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 "></div>
          <div className="border border-green-400 bg-black bg-opacity-30 rounded-lg p-4 w-96">
            <div className="flex justify-end">
              <button className="text-red-400 hover:text-red-700" onClick={handleCancelar}>
                X
              </button>
            </div>
            <h2 className="text-lg text-white font-semibold mb-4">Editar Cliente</h2>
            <div className="mb-4">
              <label htmlFor="nombre" className="block mb-2 text-white">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={editedCliente.nombre}
                onChange={(e) => setEditedCliente({ ...editedCliente, nombre: e.target.value })}
                className="border border-green-400 text-white rounded px-2 py-1 w-full bg-black bg-opacity-30 text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rut" className="block mb-2 text-white">Rut:</label>
              <input
                type="text"
                id="rut"
                name="rut"
                value={editedCliente.RUT}
                onChange={(e) => setEditedCliente({ ...editedCliente, RUT: e.target.value })}
                className="border border-green-400 text-white rounded px-2 py-1 w-full bg-black bg-opacity-30 text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="giro" className="block mb-2 text-white">Giro:</label>
              <input
                type="text"
                id="giro"
                name="giro"
                value={editedCliente.giro}
                onChange={(e) => setEditedCliente({ ...editedCliente, giro: e.target.value })}
                className="border border-green-400 text-white rounded px-2 py-1 w-full bg-black bg-opacity-30 text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="telefono" className="block mb-2 text-white">Telefono:</label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={editedCliente.telefono}
                onChange={(e) => setEditedCliente({ ...editedCliente, telefono: e.target.value })}
                className="border border-green-400 text-white rounded px-2 py-1 w-full bg-black bg-opacity-30 text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="web" className="block mb-2 text-white">Web:</label>
              <input
                type="text"
                id="web"
                name="web"
                value={editedCliente.web}
                onChange={(e) => setEditedCliente({ ...editedCliente, web: e.target.value })}
                className="border border-green-400 text-white rounded px-2 py-1 w-full bg-black bg-opacity-30 text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rut" className="block mb-2 text-white">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={editedCliente.email}
                onChange={(e) => setEditedCliente({ ...editedCliente, email: e.target.value })}
                className="border border-green-400 text-white rounded px-2 py-1 w-full bg-black bg-opacity-30 text-white"
              />
            </div>
            {/* Repite este patrón para los otros campos */}
            {/* ... */}
            <div className="flex justify-center">
              <button
                className="bg-blue-500 text-white hover:bg-blue-600 transition duration-900 rounded px-4 py-2 mx-2"
                onClick={handleGuardarCambios}
              >
                Guardar Cambios
              </button>
              <button
                className="bg-red-500 text-white hover:bg-red-600 transition duration-900 rounded px-4 py-2 mx-2"
                onClick={handleCancelar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
