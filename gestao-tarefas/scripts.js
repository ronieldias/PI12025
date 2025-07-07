let tarefas = [];
let idCounter = 1;

function getById(id) {
    return document.getElementById(id);
}

// Adiciona os listeners aos botões
const botaoAddTarefa = getById('adicionarTarefa');
botaoAddTarefa.addEventListener('click', adicionarTarefa);

/**
 * Atualiza a tabela de tarefas na tela, redesenhando todas as linhas
 * com base no array 'tarefas'.
 */
function atualizarTabela() {
    const tbody = getById("linhasTabela");
    tbody.innerHTML = ""; // Limpa o corpo da tabela para evitar duplicação

    tarefas.forEach(tarefa => {
        const isConcluida = tarefa.dataConclusao;
        const linha = `
            <tr>
                <td>${tarefa.descricao}</td>
                <td>${new Date(tarefa.dataInicio).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                <td>${isConcluida ? new Date(tarefa.dataConclusao).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : ""}</td>
                <td>
                    ${isConcluida ?
                        `<button onclick="reabrirTarefa(${tarefa.id})">Reabrir</button>` :
                        `<button onclick="concluirTarefa(${tarefa.id})">Concluir</button>`
                    }
                    <button onclick="excluirTarefa(${tarefa.id})" ${isConcluida ? 'disabled' : ''}>Excluir</button>
                </td>
            </tr>`;
        tbody.innerHTML += linha;
    });
}

/**
 * Adiciona uma nova tarefa ao array 'tarefas' e atualiza a tabela.
 */
function adicionarTarefa() {
    const descricao = getById("descricaoTarefa").value.trim();
    const dataInicio = getById("dataInicio").value;
    const erroDiv = getById('erroTarefa');

    // Validação de campos
    if (!descricao) {
        erroDiv.innerText = "A descrição da tarefa não pode ser vazia.";
        return;
    }
    if (!dataInicio) {
        erroDiv.innerText = "A data de início da tarefa não pode ser vazia.";
        return;
    }

    // Cria o objeto tarefa
    const tarefa = {
        id: idCounter++,
        descricao: descricao,
        dataInicio: dataInicio,
        dataConclusao: null // Inicia como nulo para indicar que não foi concluída
    };

    tarefas.push(tarefa);
    erroDiv.innerText = ""; // Limpa mensagens de erro
    atualizarTabela();

    // Limpa os campos do formulário
    getById("descricaoTarefa").value = "";
    getById("dataInicio").value = "";
}

/**
 * Marca uma tarefa como concluída, registrando a data atual.
 * @param {number} id O ID da tarefa a ser concluída.
 */
function concluirTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.dataConclusao = new Date().toISOString().split('T')[0]; // Formato AAAA-MM-DD
        atualizarTabela();
    }
}

/**
 * Reabre uma tarefa que já havia sido concluída.
 * @param {number} id O ID da tarefa a ser reaberta.
 */
function reabrirTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.dataConclusao = null;
        atualizarTabela();
    }
}

/**
 * Exclui uma tarefa do array, com confirmação do usuário.
 * @param {number} id O ID da tarefa a ser excluída.
 */
function excluirTarefa(id) {
    // Exibe uma caixa de confirmação antes de excluir
    const confirmou = window.confirm("Você tem certeza que deseja excluir esta tarefa?");
    if (confirmou) {
        tarefas = tarefas.filter(t => t.id !== id);
        atualizarTabela();
    }
}