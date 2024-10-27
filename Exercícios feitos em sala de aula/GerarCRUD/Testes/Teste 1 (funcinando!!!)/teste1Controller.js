// ComidaController.js

let listaComida = []; // Conjunto de dados
let oQueEstaFazendo = ''; // Variável global de controle
let comida = null; // Variável global
bloquearAtributos(true);

// Função para procurar um elemento pela chave primária
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaComida.length; i++) {
        const comida = listaComida[i];
        if (comida.id == chave) {
            comida.posicaoNaLista = i;
            return listaComida[i];
        }
    }
    return null; // Não achou
}

// Função para procurar um elemento
function procure() {
    const id = document.getElementById("inputId").value;
    if (isNaN(id) || !Number.isInteger(Number(id))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputId").focus();
        return;
    }

    if (id) { // Se digitou um Id
        comida = procurePorChavePrimaria(id);
        if (comida) { // Achou na lista
            mostrarDadosComida(comida);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { // Não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputId").focus();
        return;
    }
}

// Função para inserir um novo elemento
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clique no botão salvar");
    document.getElementById("inputId").focus();
}

// Função para alterar um elemento
function alterar() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clique no botão salvar");
}

// Função para excluir um elemento
function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - Clique no botão salvar para confirmar a exclusão");
}

// Função para salvar (inserir, alterar, excluir)
function salvar() {
    let id;
    if (comida == null) {
        id = parseInt(document.getElementById("inputId").value);
    } else {
        id = comida.id;
    }

    // Declaração dos atributos
        const nome = document.getElementById("inputNome").value;
        const peso = document.getElementById("inputPeso").value;
        const distribuidor = document.getElementById("inputDistribuidor").value;
    
    if (id && nome && peso && distribuidor) { // Se tudo está certo
        switch (oQueEstaFazendo) {
            case 'inserindo':
                comida = new Comida(id, nome, peso, distribuidor);
                listaComida.push(comida);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                const comidaAlterado = new Comida(id, nome, peso, distribuidor);
                listaComida[comida.posicaoNaLista] = comidaAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaComida.length; i++) {
                    if (comida.posicaoNaLista != i) {
                        novaLista.push(listaComida[i]);
                    }
                }
                listaComida = novaLista;
                mostrarAviso("Excluído");
                break;
            default:
                mostrarAviso("Erro desconhecido");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputId").focus();
    } else {
        alert("Erro nos dados digitados");
    }
}

// Função para listar todos os elementos
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaComida);
}

// Função para preparar a listagem
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        let item = vetor[i];
        texto += item.id + " - ";
        texto += item.nome + " - ";
        texto += item.peso + " - ";
        texto += item.distribuidor + " - ";
        
        texto += "<br>";
    }
    return texto;
}

// Função para cancelar a operação atual
function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação de edição");
}

// Função para mostrar uma mensagem de aviso
function mostrarAviso(mensagem) {
    document.getElementById("divAviso").innerHTML = mensagem;
}

// Função para mostrar os dados do Comida nos campos
function mostrarDadosComida(comida) {
    document.getElementById("inputId").value = comida.id;
    document.getElementById("inputNome").value = comida.nome;
    document.getElementById("inputPeso").value = comida.peso;
    document.getElementById("inputDistribuidor").value = comida.distribuidor;
    
    bloquearAtributos(true);
}

// Função para limpar os campos do formulário
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputPeso").value = "";
    document.getElementById("inputDistribuidor").value = "";
    
    bloquearAtributos(true);
}

// Função para definir os campos como apenas leitura ou editáveis
function bloquearAtributos(soLeitura) {
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputPeso").readOnly = soLeitura;
    document.getElementById("inputDistribuidor").readOnly = soLeitura;
    
}

// Função para definir a visibilidade dos botões
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar;
    document.getElementById("inputId").focus();
}