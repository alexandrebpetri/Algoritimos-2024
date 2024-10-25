let listaJogador = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let jogador = null; //variavel global 
bloquearAtributos(true);
mostrarJogadoresPredefinidos(listaJogador);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaJogador.length; i++) {
        const jogador = listaJogador[i];
        if (jogador.id == chave) {
            jogador.posicaoNaLista = i;
            return listaJogador[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const id = document.getElementById("inputId").value;
    if (id) { // se digitou um id
        jogador = procurePorChavePrimaria(id);
        if (jogador) { //achou na lista
            mostrarDadosJogador(jogador);
            visibilidadeDosBotoes('none', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputId").focus();
        return;
    }
}

//backend->frontend

function mostrarJogadoresPredefinidos() {
    const jogadoresPredefinidos = [
        new Jogador (1, "Carlos", "1997-01-01"),
        new Jogador (2, "Jonas", "2007-01-01"),
        new Jogador (3, "Uener", "2017-01-01"),
    ];
    listaJogador = jogadoresPredefinidos;
    listar();
}

function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputId").focus();

}

// Função para alterar um elemento da lista
function alterar() {

    // Remove o readonly dos campos
    bloquearAtributos(false);

    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

// Função para excluir um elemento da lista
function excluir() {
    bloquearAtributos(true);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)

    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
    //gerencia operações inserir, alterar e excluir na lista

    // obter os dados a partir do html

    let id;
    if (jogador == null) {
        id = document.getElementById("inputId").value;
    } else {
        id = jogador.id;
    }

    const nome = document.getElementById("inputNome").value;
    const nasc = document.getElementById("inputNasc").value;
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (id && nome && nasc) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                jogador = new Jogador(id, nome, nasc);
                listaJogador.push(jogador);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                jogadorAlterada = new Jogador(id, nome, nasc);
                listaJogador[jogador.posicaoNaLista] = jogadorAlterada;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaJogador.length; i++) {
                    if (jogador.posicaoNaLista != i) {
                        novaLista.push(listaJogador[i]);
                    }
                }
                listaJogador = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputId").focus();
    } else {
        alert("Erro nos dados digitados");
        return;
    }
}

//backend
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto +=
            linha.id + " - " +
            linha.nome + " - " +
            linha.nasc + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaJogador);
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
    //printa a mensagem na divAviso
    document.getElementById("divAviso").innerHTML = mensagem;
}

// Função para mostrar os dados do jogador nos campos
function mostrarDadosJogador(jogador) {
    document.getElementById("inputId").value = jogador.id;
    document.getElementById("inputNome").value = jogador.nome;
    document.getElementById("inputNasc").value = jogador.nasc;

    const nasc = new Date(jogador.nasc);
    const dataAtual = new Date();
    let idade = Math.ceil((dataAtual - nasc) / (1000 * 60 * 60 * 24));
    let categoria = "";
    idade = idade/365;
    console.log("Idade =" + idade);
    if (idade <= 8) {
        categoria = "sub-8";
    } else if (idade >= 8 && idade <= 10) {
        categoria = "sub-10";
    }else if (idade >= 10 && idade <= 12) {
        categoria = "sub-12";
    }else if (idade > 12 && idade <= 16) {
        categoria = "sub-16";
    }else if (idade > 16 && idade <= 18) {
        categoria = "sub-18";
    }else{
        categoria = "adulto";
    }

    document.getElementById("inputCategoria").value = categoria;
    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputNasc").value = "";
    document.getElementById("inputCategoria").value = "";
    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputNasc").readOnly  = soLeitura;
    document.getElementById("inputCategoria").readOnly = soLeitura;
}

// Função para deixar visível ou invisível os botões
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    //  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); 
    //none significa que o botão ficará invisível (visibilidade == none)
    //inline significa que o botão ficará visível 

    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar; // o cancelar sempre aparece junto com o salvar
    document.getElementById("inputId").focus();
}
