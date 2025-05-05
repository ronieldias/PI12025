const axios = require('axios');
const cheerio = require('cheerio');
async function crawlPagina(url) {
try {
const resposta = await axios.get(url);
const $ = cheerio.load(resposta.data);
const links = [];
$('a').each((i, elemento) => {
const texto = $(elemento).text();
const href = $(elemento).attr('href');
if (href) {
links.push({ texto, href });
}
});


console.log("Links encontrados:", links);
} catch (erro) {
console.error("Erro ao acessar a página:", erro.message);
}
}
// Exemplo de uso:
crawlPagina('https://ronieldias.github.io/PI12025/filmes/blade_runner.html');