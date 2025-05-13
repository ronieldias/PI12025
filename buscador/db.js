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
async function buscar(termo) {
  const res = await pool.query('SELECT url, conteudo, links FROM paginas');
  const paginas = res.rows;  

  const autoridade = {};
  const resultados = [];

  // 1. Contar links recebidos por página
  for (const pagina of paginas) {
    const links = pagina.links || [];
    for (const link of links) {
      const destino = link.href;
      if (!autoridade[destino]) autoridade[destino] = 0;
      autoridade[destino] += 1;
    }
  }


  // 2. Calcular pontuação para cada página
  for (const pagina of paginas) {
    const url = pagina.url;
    const conteudo = pagina.conteudo || '';
    const links = pagina.links || [];

    const qtdLinksRecebidos = autoridade[url] || 0;
    const pontosAutoridade = qtdLinksRecebidos * 10;

    const regex = new RegExp(termo, 'gi');
    const ocorrenciasTermo = (conteudo.match(regex) || []).length;
    const pontosTermo = ocorrenciasTermo * 5;

    const autoreferencia = links.some(link => link.href === url);
    const penalidade = autoreferencia ? -15 : 0;

    const pontuacaoTotal = pontosAutoridade + pontosTermo + penalidade;

    resultados.push({
      Pagina: url,
      Ocorrencias: pontosTermo,
      Links_Recebidos: pontosAutoridade,
      Autoreferencia: penalidade,
      Total: pontuacaoTotal
    });
    
  }

  // 3. Ordenar pelos critérios de desempate
  resultados.sort((a, b) => {
    // Ordena por pontuação total (maior primeiro)
    if (b.total !== a.total) return b.total - a.total;
  
    // Desempate 1: mais links recebidos
    if (b.linksRecebidos !== a.linksRecebidos)
      return b.linksRecebidos - a.linksRecebidos;
  
    // Desempate 2: mais ocorrências
    if (b.ocorrencias !== a.ocorrencias)
      return b.ocorrencias - a.ocorrencias;
  
    // Desempate 3: penalização por autoreferência
    return (a.autoreferencia ? 1 : 0) - (b.autoreferencia ? 1 : 0);
  });
  

  return resultados;
}


module.exports = { paginaExiste, salvarPagina, htmlPagina, linksPagina, buscar };
