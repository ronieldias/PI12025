// QUESTÃO 01 e 02
function mostrarErro(mensagem, idElemento) {
    var errorElement = document.getElementById(idElemento);
    errorElement.textContent = mensagem;
    errorElement.classList.remove('oculto');
    setTimeout(function () {
        errorElement.classList.add('oculto');
    }, 3000);
}

// QUESTAO 03
let botaoCalcular = document.getElementById('botaoCalcular');
botaoCalcular.addEventListener('click', calcularTaxaEngajamento);

function calcularTaxaEngajamento() {
    const interacoes = document.getElementById('interacoes');
    const visualizacoes = document.getElementById('visualizacoes');
    const resultadoDiv = document.getElementById('resultadoTaxa');

    if (interacoes.value.trim() === '') {
        mostrarErro(`O conteúdo do campo ${interacoes.id} não pode ser vazio`, 'mensagemErroTaxa');
    } else if (visualizacoes.value.trim() === '') {
        mostrarErro(`O conteúdo do campo ${visualizacoes.id} não pode ser vazio`, 'mensagemErroTaxa');
    } else if (isNaN(interacoes.value) || isNaN(visualizacoes.value)) {
        mostrarErro(`Insira apenas valores numéricos válidos`, 'mensagemErroTaxa');
    } else {
        let taxaEngajamento = (interacoes.value / visualizacoes.value) * 100;
        resultadoDiv.innerHTML = `<p>Taxa de engajamento: ${taxaEngajamento}%</p>`;
    }
}


// QUESTAO 04
let botaoCarregarImagem = document.getElementById('botaoCarregarImagem');
botaoCarregarImagem.addEventListener('click', carregarImagem);

function carregarImagem() {
    const imagem = document.getElementById('uploadImagem');
    const resultadoImagemDiv = document.getElementById('resultadoImagem');
    var arquivoSelecionado = imagem.files[0];

    if (!arquivoSelecionado) {
        mostrarErro(`O campo ${imagem.id} não pode ser vazio`, 'mensagemErroImagem');
    } else {
        var img = document.createElement('img');
        img.src = URL.createObjectURL(arquivoSelecionado);
        resultadoImagemDiv.appendChild(img);
    }
}

// QUESTAO 05
let botaoSelecaoImagem = document.getElementById('botaoCarregarImagemSelecionada');
botaoSelecaoImagem.addEventListener('click', selecaoImagem);

function selecaoImagem() {
    const imagem = document.getElementById('listaImagens');
    const resImgSelecionadaDiv = document.getElementById('resultadoImagemSelecionada');
    resImgSelecionadaDiv.innerHTML = '';

    if (imagem.value === '') {
        mostrarErro('Selecione uma das imagens', 'mensagemErroImagemSelecao');
    } else {
        var img = document.createElement('img');
        var opcaoSelecionada = imagem.options[imagem.selectedIndex];
        img.src = opcaoSelecionada.getAttribute('src');
        resImgSelecionadaDiv.appendChild(img);
    }
}

// QUESTAO 06
let botaoRedesSociais = document.getElementById('enviarBtn');
botaoRedesSociais.addEventListener('click', selecaoRedesSociais);

function selecaoRedesSociais() {
    const redesSociais = document.getElementsByName('redesSociais');
    const divRedesSelecionadas = document.getElementById('redesSelecionadas');
    let algumaSelecionada = false;
    let redesMarcadas = [];


    for (let i = 0; i < redesSociais.length; i++) {
        if (redesSociais[i].checked) {
            algumaSelecionada = true;
            redesMarcadas.push(redesSociais[i].value);
        }
    }

    if (!algumaSelecionada) {
        mostrarErro('Ao menos uma das redes deve ser selecionada', 'mensagemErroRedesSociais');
    } else {
        divRedesSelecionadas.innerHTML = redesMarcadas.join(', ');
    }
}


// QUESTAO 07, 08, 09
let selectHashtags = null;
let botaoHashtags = document.getElementById('botaoAddHashtag');
botaoHashtags.addEventListener('click', addHashtag);

function hasgtagExiste(hashtag) {
    if (!selectHashtags) return false;

    for (let i = 0; i < selectHashtags.options.length; i++) {
        if (selectHashtags.options[i].value === hashtag.value.trim()) {
            return true;
        }
    }
    return false;
}

function addHashtag() {
    const hashtag = document.getElementById('hashtag');
    const resAddHashtag = document.getElementById('resultadoAddHashtag');

    if (hashtag.value.trim() === '') {
        mostrarErro('Hashtag vazia ou composta apenas por espaços', 'mensagemErroAddHashtag');
    } else if (hasgtagExiste(hashtag)) {
        mostrarErro('Hashtag já existe', 'mensagemErroAddHashtag');
    } else if (hashtag.value.trim().length < 2) {
        mostrarErro('Tamanho inferior a dois caracteres', 'mensagemErroAddHashtag');
    } else if (selectHashtags && selectHashtags.options.length >= 5) {
        mostrarErro('Limite de 5 hashtags excedido', 'mensagemErroAddHashtag');
    } else {
        // Cria o select se não existir
        if (!selectHashtags) {
            selectHashtags = document.createElement('select');
            selectHashtags.size = 5;
            resAddHashtag.appendChild(selectHashtags);
        }
        // Cria a option
        var option = document.createElement('option');
        option.value = hashtag.value.trim();
        option.textContent = hashtag.value.trim();
        // Adiciona ao select
        selectHashtags.appendChild(option);
        // Limpa o input
        hashtag.value = '';
    }

}

let botaoExibirHashtags = document.getElementById('botaoExibirHashtags');
botaoExibirHashtags.addEventListener('click', exibirHashtags);

function exibirHashtags() {
    const resExibirHashtag = document.getElementById('resultadoExibirHashtags')

    if (!selectHashtags || selectHashtags.options.length === 0) {
        mostrarErro('Nenhuma hashtag adicionada', 'mensagemErroExibirHashtag');
    } else {
        let hashtags = [];
        for (let i = 0; i < selectHashtags.options.length; i++) {
            hashtags.push(selectHashtags.options[i].value);
        }
        resExibirHashtag.innerHTML = hashtags.join(', ');
    }
}

let botaoRemoverHashtag = document.getElementById('botaoRemoverHashtag');
botaoRemoverHashtag.addEventListener('click', removerHashtag);

function removerHashtag() {
    const resExibirHashtag = document.getElementById('resultadoExibirHashtags');
    resExibirHashtag.innerHTML = ''; // Limpa a exibição de hashtags

    // Verifica se a lista de hashtags existe e se há algo selecionado
    if (selectHashtags && selectHashtags.selectedOptions.length > 0) {
        // Pega a primeira (e única) opção selecionada
        const optionParaRemover = selectHashtags.selectedOptions[0];
        // Remove o 'filho' (a option) do 'pai' (o select)
        selectHashtags.removeChild(optionParaRemover);
    } else {
        // Caso contrário, exibe um erro
        mostrarErro('Nenhuma hashtag selecionada para remover', 'mensagemErroExibirHashtag');
    }
}

// QUESTÃO 10
