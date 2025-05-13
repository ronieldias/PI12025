const axios = require('axios');
const cheerio = require('cheerio');
const { paginaExiste, salvarPagina, htmlPagina, linksPagina } = require('./db');

const visitados = new Set();

async function crawlPagina(url) {
  if (visitados.has(url) || await paginaExiste(url)) return;

  try {
    const resposta = await axios.get(url);
    const html = resposta.data;
    const $ = cheerio.load(html);

    const links = [];
    $('a').each((_, el) => {
      const texto = $(el).text().trim();
      const href = $(el).attr('href');
      if (href){
        const absHref = new URL(href, url).href;
        links.push({ texto, href: absHref });
      }
    });

    await salvarPagina(url, html, links);
    visitados.add(url);
    console.log(`✅ Salvo: ${url}`);

    // Visita recursiva dos links
    for (const { href } of links) {
      const absUrl = new URL(href, url).href;
      await crawlPagina(absUrl);
    }

  } catch (err) {
    console.error(`❌ Erro ao acessar ${url}:`, err.message);
  }
}

// Iniciar com a página inicial
crawlPagina('https://ronieldias.github.io/PI12025/filmes/blade_runner.html');

