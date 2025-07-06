import { useState, useEffect } from 'react';

export default function Inventario() {
  const [datos, setDatos] = useState([]);
  const [tablaActual, setTablaActual] = useState('productos'); // Estado para la tabla activa

  useEffect(() => {
    const url = tablaActual === 'productos' 
      ? '${process.env.REACT_APP_API_URL}/api/productos' 
      : '${process.env.REACT_APP_API_URL}/api/clientes';
    
    fetch(url)
      .then(res => res.json())
      .then(data => setDatos(data))
      .catch(err => console.error("Error en fetch:", err));
  }, [tablaActual]); // Se ejecuta cuando cambia tablaActual

  const mostrarPrimerCliente = () => {
  
    console.log("Debug - datos:", datos); // ← Verifica el array completo
    console.log("Debug - longitud:", datos.length); // ← Verifica la longitud

    
    if (tablaActual === 'clientes' && datos.length > 0) {
      console.log(1);
      alert(`Primer cliente: ${datos[0].nombre}`);
    } else {
      // Si estamos en la tabla de productos o no hay datos, hacemos fetch de clientes
      fetch('http://localhost:3001/api/clientes')
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) {
            alert(`Primer cliente: ${data[0].nombre}`);
          } else {
            alert('No hay clientes registrados');
          }
        })
        .catch(err => alert('Error al cargar clientes'));
    }
  };


  return (
    <div style={{ padding: '20px' }}>
      <h1>Inventario Ferretería</h1>
      
      {/* Menú de navegación */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setTablaActual('productos')}
          style={{ 
            marginRight: '10px',
            backgroundColor: tablaActual === 'productos' ? '#4CAF50' : '#ddd',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Productos
        </button>
        <button 
          onClick={() => setTablaActual('clientes')}
          style={{
            backgroundColor: tablaActual === 'clientes' ? '#4CAF50' : '#ddd',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Clientes
          
        </button>
          

      </div>
      <button 
       onClick={() => mostrarPrimerCliente()}
        style={{
          backgroundColor: '#2196F3',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          marginLeft: '10px'
        }}
      >
      Clientazo papaaa
      </button>    
      {/* Tabla de datos */}
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {tablaActual === 'productos' ? (
              <>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
              </>
            ) : (
              <th>Nombre del Cliente</th>
            )}
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => (
            <tr key={item.id}>
              {tablaActual === 'productos' ? (
                <>
                  <td>{item.nombre}</td>
                  <td>${item.precio}</td>
                  <td>{item.stock}</td>
                </>
              ) : (
                <td>{item.nombre}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}