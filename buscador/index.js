import pkg from './db.js';
const { paginaExiste, salvarPagina, htmlPagina, linksPagina, buscar } = pkg;


//TESTES AQUI...

// Retornando apenas os links de uma página
//console.log('\n\n[*** LINKS DA PÁGINA ***]\n', await linksPagina('https://ronieldias.github.io/PI12025/filmes/blade_runner.html'));

// Retornando html da página na íntegra
//console.log('\n\n[*** PÁGINA NA ÍNTEGRA ***]:\n', await htmlPagina('https://ronieldias.github.io/PI12025/filmes/blade_runner.html'));

// Passe o termo a ser procurado
const termo = 'Matrix'; 
const resultados = await buscar(termo);

console.log(`\n\nTermo buscado: ${termo}`);
console.log('### PONTUAÇÃO ###');

console.table(resultados);

/*
for (const resultado of resultados) {
    if(resultado.ocorrenciasTermo == 0)
        continue;
    console.log('----------------------------------------------------------------------------');
    console.log(`Página: ${resultado.url}`);
    console.log(`Ocorrências: ${resultado.ocorrenciasTermo * 5}`);
    console.log(`Links Recebidos: ${resultado.qtdLinksRecebidos * 10}`);
    console.log(`Autorreferência: ${(resultado.autoreferencia) ? -15 : 0 }`);
    console.log(`Total: ${resultado.pontuacao}`);
}
    */