import React, {useState} from 'react';

export const ClienteFormulario = () => {
    const [cliente, setCliente] = useState({
        nombre: '',
        RUT: '',
        giro: '',
        telefono: '',
        email: '',
        web: '',
    });

    const[alerta, setAlerta] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCliente({ ...cliente, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/clientes', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(cliente),
            });

            if (response.status === 200) {
                setAlerta('Cliente agregado correctamente');
              } else {
                setAlerta('Cliente agregado correctamente');
              }
    } catch (error) {
        console.error(error);
        setAlerta('Error al conectar con el servidor');
    }
};

const handleCancelar = () => {
    setCliente({
        nombre: '',
        RUT: '',
        giro: '',
        telefono: '',
        email: '',
        web: '',
    });
    setAlerta('');
};

return (
    <div className='flex justify-center items-center h-screen'>
    <div className="bg-black bg-opacity-75 p-6 mt-1 rounded-lg border-2 border-green-400 w-full sm:w-4/5 md:w-3/5 lg:w-2/5">
      <h2 className="text-2xl font-semibold text-white mb-4 text-center mb-8">Agregar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2" htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={cliente.nombre}
            onChange={handleChange}
            className="bg-gray-800 rounded-lg p-2 w-full text-white hover:bg-green-400 hover:bg-opacity-75 hover:text-white hover:font-semibold transition duration-600 hover:ease-in-out"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2" htmlFor="nombre">Rut</label>
          <input
            type="text"
            id="RUT"
            name="RUT"
            value={cliente.RUT}
            onChange={handleChange}
            className="bg-gray-800 rounded-lg p-2 w-full text-white hover:bg-green-400 hover:text-gray-600 hover:font-semibold transition duration-600 hover:ease-in-out"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2" htmlFor="nombre">Giro</label>
          <input
            type="text"
            id="giro"
            name="giro"
            value={cliente.giro}
            onChange={handleChange}
            className="bg-gray-800 rounded-lg p-2 w-full text-white hover:bg-green-400 hover:text-gray-600 hover:font-semibold transition duration-600 hover:ease-in-out"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2" htmlFor="nombre">Teléfono</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={cliente.telefono}
            onChange={handleChange}
            className="bg-gray-800 rounded-lg p-2 w-full text-white hover:bg-green-400 hover:text-gray-600 hover:font-semibold transition duration-600 hover:ease-in-out"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2" htmlFor="nombre">Web</label>
          <input
            type="text"
            id="web"
            name="web"
            value={cliente.web}
            onChange={handleChange}
            className="bg-gray-800 rounded-lg p-2 w-full text-white hover:bg-green-400 hover:text-gray-600 hover:font-semibold transition duration-600 hover:ease-in-out"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2" htmlFor="nombre">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={cliente.email}
            onChange={handleChange}
            className="bg-gray-800 rounded-lg p-2 w-full text-white hover:bg-green-400 hover:text-gray-600 hover:font-semibold transition duration-600 hover:ease-in-out"
            required
          />
        </div>
        {/*Aquí debajo pueden agregar más campos...*/}
        
        <div className="mt-4 justify-center flex">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 mr-4 rounded-lg transition duration-300"
          >
            Registrar
          </button>
          <button
            type="button"
            onClick={handleCancelar}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Cancelar
          </button>
        </div>
      </form>
      {alerta && (
        <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-lg">
          {alerta}
        </div>
      )}
    </div>
    </div>
  );
};
