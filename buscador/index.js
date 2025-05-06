import axios from 'axios';
import * as cheerio from 'cheerio'; // <-- corrigido
import { paginaExiste, salvarPagina, htmlPagina, linksPagina } from './db.js';

//TESTES AQUI...

// Retornando apenas os links de uma página
console.log('\n\n[*** LINKS DA PÁGINA ***]\n', await linksPagina('https://ronieldias.github.io/PI12025/filmes/blade_runner.html'));

// Retornando html da página na íntegra
console.log('\n\n[*** PÁGINA NA ÍNTEGRA ***]:\n', await htmlPagina('https://ronieldias.github.io/PI12025/filmes/blade_runner.html'));