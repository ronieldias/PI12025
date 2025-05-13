import pkg from './db.js';
const { paginaExiste, salvarPagina, htmlPagina, linksPagina, buscar } = pkg;


// TESTES AQUI...
// Testes de persistencia
// Retornando apenas os links de uma página
//console.log('\n\n[*** LINKS DA PÁGINA ***]\n', await linksPagina('https://ronieldias.github.io/PI12025/filmes/blade_runner.html'));

// Retornando html da página na íntegra
//console.log('\n\n[*** PÁGINA NA ÍNTEGRA ***]:\n', await htmlPagina('https://ronieldias.github.io/PI12025/filmes/blade_runner.html'));

// Testes do buscador
// Passe o termo a ser procurado
const termo = 'Matrix'; 
const resultados = await buscar(termo);

console.log(`\n\nTermo buscado: ${termo}`);
console.log('### RESULTADOS DA BUSCA ###');

//console.table(resultados);

const resultadosComIndice = resultados.map((r, i) => ({
  'posicao': i + 1,
  ...r
}));
console.table(resultadosComIndice);
