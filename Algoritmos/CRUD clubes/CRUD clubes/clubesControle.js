let listaClubes = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let clube = null; //variavel global 

window.onload = inserirDadosIniciais();

//metodo para mostrar mensagem quando o foco for para a chave primaria 
document.getElementById("inputClube").addEventListener("focus", function () {
    mostrarAviso("Digite o nome do clube e clic no botão procure");
});

//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaClubes.length; i++) {
        const clube = listaClubes[i];
        if (clube.ra == chave) {
            clube.posicaoNaLista = i;
            return listaClubes[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const nome = document.getElementById("inputClube").value;
    if (nome) { // se digitou um Ra
        clube = procurePorChavePrimaria(nome);
        if (clube) { //achou na lista
            mostrarDadosClube(clube);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputClube").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    liberarEdicaoDaChaveOuAtributos(true);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputClube").focus();

    //para facilitar os testes sem ter que digitar notas (vai sumir quando terminarem os testes)
    document.getElementById("inputNacionais").value = 7;
    document.getElementById("inputCopas").value = 7;
    document.getElementById("inputLibertadores").value = 7;
    document.getElementById("mundiais").value = 7;
}

// Função para alterar um elemento da lista
function alterar() {

    // Remove o readonly dos campos
    liberarEdicaoDaChaveOuAtributos(true);

    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

// Função para excluir um elemento da lista
function excluir() {
    liberarEdicaoDaChaveOuAtributos(true);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)

    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
    //gerencia operações inserir, alterar e excluir na lista
    const nome = document.getElementById("inputClube").value;
    const criacao = document.getElementById("inputCriacao").value;

    let nacionais = parseFloat(document.getElementById("inputNacionais").value);
    let copas = parseFloat(document.getElementById("inputCopas").value);
    let libertadores = parseFloat(document.getElementById("inputLibertadores").value);
    let mundiais = parseFloat(document.getElementById("inputMundiais").value);

    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (ra &&
        nome &&
        !isNaN(parseFloat(nota1)) && nota1 >= 0  &&
        !isNaN(parseFloat(nota2)) && nota2 >= 0  &&
        !isNaN(parseFloat(nota3)) && nota3 >= 0  &&
        !isNaN(parseFloat(nota4)) && nota4 >= 0
    ) { // se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                clube = new Clube(nome, criacao, nacionais, copas, libertadores, mundiais, posicaoNaLista);
                listaClubes.push(clube);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                clubeAlterado = new Clube(nome, criacao, nacionais, copas, libertadores, mundiais, posicaoNaLista);
                listaClubes[clube.posicaoNaLista] = clubeAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaClubes.length; i++) {
                    if (clube.posicaoNaLista != i) {
                        novaLista.push(listaClubes[i]);
                    }
                }
                listaClubes = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputClube").focus();
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
        texto += linha.nome + " - " +
            linha.criacao + " - " +
            linha.nacionais + " - " +
            linha.copas + " - " +
            linha.libertadores + " - " +
            linha.mundiais + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaClubes);
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

// Função para mostrar os dados do aluno nos campos
function mostrarDadosAluno(clube) {
    document.getElementById("inputCriacao").value = clube.criacao;
    document.getElementById("inputNacionais").value = clube.nacionais;
    document.getElementById("inputCopas").value = clube.copas;
    document.getElementById("inputLibertadores").value = clube.libertadores;
    document.getElementById("inputMundiais").value = clube.mundiais;

    // Define os campos como readonly
    liberarEdicaoDaChaveOuAtributos(false);
}

function liberarEdicaoDaChaveOuAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputClube").readOnly = soLeitura;
    document.getElementById("inputCriacao").readOnly = !soLeitura;
    document.getElementById("inputNacionais").readOnly = !soLeitura;
    document.getElementById("inputCopas").readOnly = !soLeitura;
    document.getElementById("inputLibertadores").readOnly = !soLeitura;
    document.getElementById("inputMundiais").readOnly = !soLeitura;
}

// Função para limpar os dados
function limparAtributos() {
    document.getElementById("inputCriacao").value = "";
    document.getElementById("inputNacionais").value = "";
    document.getElementById("inputCopas").value = "";
    document.getElementById("inputLibertadores").value = "";
    document.getElementById("inputMundiais").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(valor) {
    //quando recebe valor == true no parâmetro, libera a chave e bloqueia a edição dos outros atributos. Se receber false, faz o contrário.
    document.getElementById("inputClube").readOnly = !valor; // sempre ao contrário dos outros atributos
    document.getElementById("inputCriacao").readOnly = valor;
    document.getElementById("inputNacionais").readOnly = valor;
    document.getElementById("inputCopas").readOnly = valor;
    document.getElementById("inputLibertadores").readOnly = valor;
    document.getElementById("inputMundiais").readOnly = valor;
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
    document.getElementById("inputClube").focus();
}

//backend
function inserirDadosIniciais() {
    //esta função é para não ter que ficar digitando dados a cada vez que 
    //recarrega a página. Facilita os testes. 

    listaClubes = [];//se houver dados na lista, apaga todos
    let clube = new Clube('Flamengo', '', 8.5, 7.2, 9.0, 8.0);
    listaClubes.push(clube);
    clube = new Clube('111', 'Ana Silva', 8.5, 7.2, 9.0, 8.0);
    listaClubes.push(clube);
    clube = new Clube('111', 'Ana Silva', 8.5, 7.2, 9.0, 8.0);
    listaClubes.push(clube);
    clube = new Clube('111', 'Ana Silva', 8.5, 7.2, 9.0, 8.0);
    listaClubes.push(clube);
    clube = new Clube('111', 'Ana Silva', 8.5, 7.2, 9.0, 8.0);
    listaClubes.push(clube);
    clube = new Clube('111', 'Ana Silva', 8.5, 7.2, 9.0, 8.0);
    listaClubes.push(clube);
    clube = new Clube('111', 'Ana Silva', 8.5, 7.2, 9.0, 8.0);
    listaClubes.push(clube);
    listar();
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    bloquearAtributos(true);
}
