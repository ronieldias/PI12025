function mostrarErro(mensagem, idElemento) {
    var errorElement = document.getElementById(idElemento);
    errorElement.textContent = mensagem;
    errorElement.classList.remove('oculto');
    setTimeout(function () {
        errorElement.classList.add('oculto');
    }, 3000);
}

let botaoMoveDir = document.getElementById('moverParaDireitaBtn');
botaoMoveDir.addEventListener('click', moverParaDireita);

function moverParaDireita() {
    var ativosDisponiveis = document.getElementById('ativosDisponiveis');
    var carteiraInvestimentos = document.getElementById('carteiraInvestimentos');

    var selecionados = [];
    for (var i = 0; i < ativosDisponiveis.options.length; i++) {
        if (ativosDisponiveis.options[i].selected) {
            selecionados.push(ativosDisponiveis.options[i]);
        }
    }

    if (selecionados.length === 0) {
        mostrarErro('Selecione pelo menos um ativo', 'mensagemErro');
        return;
    }

    for (var i = 0; i < selecionados.length; i++) {
        carteiraInvestimentos.appendChild(selecionados[i]);
    }
}

let botaoMoveEsq = document.getElementById('moverParaEsquerdaBtn');
botaoMoveEsq.addEventListener('click', moverParaEsquerda);

function moverParaEsquerda() {
    var ativosDisponiveis = document.getElementById('ativosDisponiveis');
    var carteiraInvestimentos = document.getElementById('carteiraInvestimentos');

    var selecionados = [];
    for (var i = 0; i < carteiraInvestimentos.options.length; i++) {
        if (carteiraInvestimentos.options[i].selected) {
            selecionados.push(carteiraInvestimentos.options[i]);
        }
    }

    if (selecionados.length === 0) {
        mostrarErro('Selecione pelo menos um ativo', 'mensagemErro');
        return;
    }

    for (var i = 0; i < selecionados.length; i++) {
        ativosDisponiveis.appendChild(selecionados[i]);
    }
}