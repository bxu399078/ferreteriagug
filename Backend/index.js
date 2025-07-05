const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


// Conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ferreteria_db',
  password: 'tu_password',
  port: 5432,
});

// Ruta para obtener productos
app.get('/api/productos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM productos');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error del servidor');
  }
});

app.get('/api/clientes', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM cliente');
      res.json(rows);
      //console.log(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    }
  });
  



// Iniciar servidor
/* const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
}); */

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port ${process.env.PORT || 3001}`);
});