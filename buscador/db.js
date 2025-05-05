require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function paginaExiste(url) {
  const res = await pool.query('SELECT 1 FROM paginas WHERE url = $1', [url]);
  return res.rowCount > 0;
}

async function salvarPagina(url, conteudo, links) {
  await pool.query(
    'INSERT INTO paginas (url, conteudo, links) VALUES ($1, $2, $3)',
    [url, conteudo, JSON.stringify(links)]
  );
}

module.exports = { paginaExiste, salvarPagina };
