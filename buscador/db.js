require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

/*
  TIPO: READ
  OBJETIVO: verificar se página já está no banco
  PARÂMETROS: url da página
  RETORNO: booleano
*/
async function paginaExiste(url) {
  const res = await pool.query('SELECT 1 FROM paginas WHERE url = $1', [url]);
  return res.rowCount > 0;
}

/*
  TIPO: CREATE
  OBJETIVO: persistir uma página no banco
  PARÂMETROS: url da página, html da página, links da página
  RETORNO: nenhum
*/
async function salvarPagina(url, conteudo, links) {
  await pool.query(
    'INSERT INTO paginas (url, conteudo, links) VALUES ($1, $2, $3)',
    [url, conteudo, JSON.stringify(links)]
  );
}

/*
  TIPO: READ
  OBJETIVO: retornar html de uma página
  PARÂMETROS: url da página
  RETORNO: texto html
*/
async function htmlPagina(url){
  const res = await pool.query('SELECT conteudo FROM paginas WHERE url = $1', [url]);
  return res.rows[0]?.conteudo || null;
}

/*
  TIPO: READ
  OBJETIVO: retornar links de uma página
  PARÂMETROS: url da página
  RETORNO: texto links
*/
async function linksPagina(url){
  const res = await pool.query('SELECT links FROM paginas WHERE url = $1', [url]);
  return res.rows[0]?.links || [];
}


// Outras funções a partir daqui...
// (...)

module.exports = { paginaExiste, salvarPagina, htmlPagina, linksPagina };
