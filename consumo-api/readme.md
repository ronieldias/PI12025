# APIs Utilizadas no Projeto

Este documento explica as três APIs utilizadas no projeto.

## 1. API de Gatos Aleatórios (The Cat API)

### O que faz
Fornece imagens aleatórias de gatos.

### Endpoint utilizado
```
https://api.thecatapi.com/v1/images/search/
```

### Como funciona
- Faz uma requisição GET para a API
- Recebe um array JSON com informações da imagem
- Extrai a URL da imagem do primeiro resultado (`json[0].url`)
- Exibe a imagem no elemento HTML com id "gato"

### Exemplo de resposta
```json
[
  {
    "id": "abc123",
    "url": "https://cdn2.thecatapi.com/images/abc123.jpg",
    "width": 1200,
    "height": 800
  }
]
```

## 2. API de Geocodificação (Nominatim)

### O que faz
Converte nomes de cidades em coordenadas geográficas (latitude e longitude).

### Endpoint utilizado
```
https://nominatim.openstreetmap.org/search
```

### Como funciona
- Recebe o nome da cidade digitado pelo usuário
- Faz uma requisição GET com parâmetros específicos
- Retorna as coordenadas da cidade encontrada
- Passa essas coordenadas para a API de clima

### Parâmetros utilizados
- `q`: nome da cidade
- `format=json`: formato da resposta
- `limit=1`: apenas um resultado

### Exemplo de resposta
```json
[
  {
    "lat": "-23.5505",
    "lon": "-46.6333",
    "display_name": "São Paulo, Brasil"
  }
]
```

## 3. API de Previsão do Tempo (Open-Meteo)

### O que faz
Fornece dados meteorológicos atuais baseados em coordenadas geográficas.

### Endpoint utilizado
```
https://api.open-meteo.com/v1/forecast
```

### Como funciona
- Recebe latitude e longitude da API Nominatim
- Faz uma requisição GET com as coordenadas
- Retorna dados meteorológicos atuais
- Exibe temperatura, vento e turno (dia/noite)

### Parâmetros utilizados
- `latitude`: coordenada de latitude
- `longitude`: coordenada de longitude
- `current_weather=true`: dados do clima atual

### Dados exibidos
- **Temperatura**: em graus Celsius
- **Velocidade do vento**: em Km/h
- **Direção do vento**: em graus (0-360°)
- **Turno**: dia ou noite

### Exemplo de resposta
```json
{
  "current_weather": {
    "temperature": 25.5,
    "windspeed": 12.3,
    "winddirection": 180,
    "is_day": 1
  }
}
```
## 4. API de Criação de Posts (JSONPlaceholder)

### O que faz
Permite criar posts simulados através de requisições HTTP POST.

### Endpoint utilizado
```
https://jsonplaceholder.typicode.com/posts
```

### Como funciona
- Recebe título e conteúdo do usuário
- Valida campos obrigatórios
- Faz requisição POST
- Retorna post criado com ID

### Dados enviados
```json
{
  "title": "Título do post",
  "body": "Conteúdo do post",
  "userId": 2
}
```

### Exemplo de resposta
```json
{
  "id": 101,
  "title": "Título do post",
  "body": "Conteúdo do post",
  "userId": 2
}
```

### Tratamento de Erros
- **Campos vazios**: "Preencha título e corpo"
- **Erro na requisição**: Exibe status HTTP
- **Outros erros**: Mensagem genérica

### Método HTTP
**POST** - para criar novo recurso

### Requisitos Técnicos
- API gratuita, sem autenticação
- Dados em JSON
- Fetch com async/await

## 5. API de Clima (OpenWeather)

### O que faz
Fornece dados meteorológicos detalhados de uma cidade específica, utilizando uma chave de API (API Key) para autenticação.

### Endpoint utilizado
```
https://api.openweathermap.org/data/2.5/weather
```

### Como funciona
- Recebe o nome da cidade e o código do país digitados pelo usuário
- Utiliza uma API Key, armazenada no arquivo config.js, para autenticar a requisição
- Faz uma requisição GET para a API, enviando a cidade, o código do país e a chave como parâmetros
- Exibe uma grande variedade de dados meteorológicos

### Parâmetros utilizados
- `q`: nome da cidade e código do país
- `appid`: chave da API (API Key)

### Dados exibidos
- **Nome da cidade e código do País**: ex: Teresina, BR
- **Latitude e Longitude**: ex: Latitude: -5.0892, Longitude: -42.8019
- **Descricao do tempo**: ex: céu limpo
- **Temperaturas**: Convertidas de Kelvin para Celsius (atual, mínima, máxima)
- **Sensação térmica**: Temperatura percebida
- **Umidade**: Percentual de umidade do ar
- **Velocidade do vento**: Convertida de m/s para km/h
- **Visibilidade**: Convertida de metros para quilômetros

### Autenticação
- **API Key**: A chave é enviada como parâmetro na URL da requisição (`APPID=sua_chave_aqui`)

### Exemplo de resposta
```json
{
	"coord": {
		"lon": -42.8019,
		"lat": -5.0892
	},
	"weather": [
		{
			"id": 800,
			"main": "Clear",
			"description": "céu limpo",
			"icon": "01n"
		}
	],
	"base": "stations",
	"main": {
		"temp": 304.99,
		"feels_like": 305.2,
		"temp_min": 304.99,
		"temp_max": 304.99,
		"pressure": 1012,
		"humidity": 40,
		"sea_level": 1012,
		"grnd_level": 1000
	},
	"visibility": 10000,
	"wind": {
		"speed": 1.54,
		"deg": 320
	},
	"clouds": {
		"all": 0
	},
	"dt": 1751839121,
	"sys": {
		"type": 1,
		"id": 8447,
		"country": "BR",
		"sunrise": 1751792442,
		"sunset": 1751835054
	},
	"timezone": -10800,
	"id": 3386496,
	"name": "Teresina",
	"cod": 200
}
```

## 6. API de Artistas (Spotify)

### O que faz
Permite buscar informações de artistas na base de dados do Spotify, como nome, popularidade, número de seguidores e imagem.

### Endpoint utilizado
```
https://accounts.spotify.com/api/token (autenticação)
https://api.spotify.com/v1/search (busca)
```

### Como funciona
O processo ocorre em duas etapas principais:

**Etapa 1: Obter o Token de Acesso**
- Utiliza as credenciais Client ID e Client Secret (armazenadas em config.js)
- Faz uma requisição POST ao endpoint de autenticação do Spotify
- A API retorna um token de acesso (access_token) válido por uma hora
- O token é armazenado para reutilização em requisições futuras

**Etapa 2: Buscar o Artista**
- Com o token válido, faz uma requisição GET ao endpoint de busca
- O nome do artista é enviado como parâmetro de busca
- O token de acesso é enviado no cabeçalho Authorization
- A API retorna os dados do artista encontrado

### Parâmetros utilizados
- `q`: nome do artista
- `type`: tipo de busca (artist)
- `limit`: número máximo de resultados

### Dados exibidos
- **Nome do artista**: Nome oficial
- **Popularidade**: Índice de popularidade (0-100)
- **Seguidores**: Número total de seguidores
- **Imagem**: Foto do artista
- **Gêneros**: Gêneros musicais associados

### Autenticação
- **OAuth 2.0 (Client Credentials Flow)**: Fluxo de autenticação seguro onde a aplicação se identifica usando seu Client ID e Client Secret para obter um Bearer Token temporário

### Exemplo de resposta
```json
{
	"artists": {
		"href": "https://api.spotify.com/v1/search?offset=0&limit=1&query=Tim%20Maia&type=artist",
		"limit": 1,
		"next": "https://api.spotify.com/v1/search?offset=1&limit=1&query=Tim%20Maia&type=artist",
		"offset": 0,
		"previous": null,
		"total": 845,
		"items": [
			{
				"external_urls": {
					"spotify": "https://open.spotify.com/artist/0jOs0wnXCu1bGGP7kh5uIu"
				},
				"followers": {
					"href": null,
					"total": 2221050
				},
				"genres": [
					"mpb"
				],
				"href": "https://api.spotify.com/v1/artists/0jOs0wnXCu1bGGP7kh5uIu",
				"id": "0jOs0wnXCu1bGGP7kh5uIu",
				"images": [
					{
						"url": "https://i.scdn.co/image/ab6761610000e5ebaa594f902dd3a6704715933f",
						"height": 640,
						"width": 640
					},
					{
						"url": "https://i.scdn.co/image/ab67616100005174aa594f902dd3a6704715933f",
						"height": 320,
						"width": 320
					},
					{
						"url": "https://i.scdn.co/image/ab6761610000f178aa594f902dd3a6704715933f",
						"height": 160,
						"width": 160
					}
				],
				"name": "Tim Maia",
				"popularity": 68,
				"type": "artist",
				"uri": "spotify:artist:0jOs0wnXCu1bGGP7kh5uIu"
			}
		]
	}
}
```

### Requisitos Técnicos
- Client ID e Client Secret do Spotify
- Token de acesso renovável
- Autenticação via Bearer Token
- Dados em JSON