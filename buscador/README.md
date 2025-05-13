# 🔍 Buscador de Páginas HTML

## 📦 Dependências

- Node.js
- PostgreSQL (com uma base de dados chamada `mPages` já criada)

Antes de rodar o projeto, crie no banco mPages a tabela paginas com o seguinte comando SQL:
```sql
CREATE TABLE paginas (
  id SERIAL PRIMARY KEY,
  url TEXT UNIQUE NOT NULL,
  conteudo TEXT,
  links JSONB
);
```

### 📁 Bibliotecas Node.js utilizadas

- `dotenv` – Carrega variáveis de ambiente do arquivo `.env`
- `pg` – Driver para conexão com o PostgreSQL
- `axios` – Cliente HTTP para buscar o conteúdo das páginas
- `cheerio` – Parser de HTML (semelhante ao jQuery)

Para instalar os módulos

```bash
npm install dotenv pg axios cheerio
```

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
```
DATABASE_URL=postgresql://<usuario>:<senha>@localhost:5432/mPages
```

Rodar o Crawler
```bash
node crawler.js
```

Rodar Busca
```bash
node index.js
```

A saída exibirá uma tabela com as páginas ranqueadas pelo termo buscado.

Critérios de pontuação:
- +10 pontos por cada link recebido (autoridade)
- +5 pontos por ocorrência do termo no conteúdo
- −15 pontos se a página tem link para si mesma (autoreferência)