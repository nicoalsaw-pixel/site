const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Para permitir requisições do seu frontend

const app = express();
const port = 3000;

// Conexão com o Banco de Dados PostgreSQL
const pool = new Pool({
  user: 'seu_usuario',
  host: 'seu_host_bd',
  database: 'seu_banco',
  password: 'sua_senha',
  port: 5432, // Porta padrão do Postgre
});

app.use(cors()); // Habilita o CORS

// Rota da API para buscar e atualizar visualizações
app.get('/api/views', async (req, res) => {
  try {
    await pool.query('UPDATE views SET count = count + 1 WHERE id = 1');
    const result = await pool.query('SELECT count FROM views WHERE id = 1');

    // Retorna o JSON que seu script.js espera
    res.json({ views: result.rows[0].count }); 
  } catch (err) {
    console.error('Erro na query do BD', err);
    res.status(500).json({ views: 'Erro' });
  }
});

app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
});