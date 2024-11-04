let listaCelular = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let celular = null; //variavel global 
bloquearAtributos(true);
mostrarCelularesPredefinidos(listaCelular);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaCelular.length; i++) {
        const celular = listaCelular[i];
        if (celular.id == chave) {
            celular.posicaoNaLista = i;
            return listaCelular[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const id = document.getElementById("inputId").value;
    if (isNaN(id) || !Number.isInteger(Number(id))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputId").focus();
        return;
    }

    if (id) { // se digitou um Id
        celular = procurePorChavePrimaria(id);
        if (celular) { //achou na lista
            mostrarDadosCelular(celular);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
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
function mostrarCelularesPredefinidos() {
    const celularesPredefinidos = [
        new Celular (1, "Motorola", "G9", "Lenovo", 2020-01-01, 4, 64, 711, "1600 x 720"),
        new Celular (2, "Xiaomi", "Redmi 9t", "Xiaomi", 2021-01-18, 4, 128, 2300, "2340 x 1880"),
        new Celular (3, "Apple", "iPhone 15", "Apple", 2023-01-01, 12, 256, 10000, "2340 x 1920"),
        new Celular (4, "Xiaomi", "Redmi 11", "Xiaomi", 2021-10-18, 6, 128, 2300, "2340 x 1080"),
    ];
    listaCelular = celularesPredefinidos;
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
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)

    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
    //gerencia operações inserir, alterar e excluir na lista

// obter os dados a partir do html

    let id;
    if (celular == null) {
         id = parseInt(document.getElementById("inputId").value);
    } else {
        id = celular.id;
    }

    const marca = document.getElementById("inputMarca").value;
    const modelo = document.getElementById("inputModelo").value;
    const fabricante = document.getElementById("inputFabricante").value;
    const dataLancamento = document.getElementById("inputDataLancamento").value;
    const memoriaRAM = parseInt(document.getElementById("inputMemoriaRAM").value);
    const memoriaROM = parseInt(document.getElementById("inputMemoriaROM").value);
    const resolucaoDaTela = document.getElementById("inputResolucao").value;
    const preco = parseFloat(document.getElementById("inputPreco").value);
    //verificar se o que foi digitado pelo USUÁRIO está correto
if(id && marca && modelo && fabricante && dataLancamento && memoriaRAM && memoriaROM && resolucaoDaTela && preco ){// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                celular = new Celular(id,marca,modelo,fabricante,dataLancamento,memoriaRAM,memoriaROM,resolucaoDaTela,preco);
                listaCelular.push(celular);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                celularAlterado = new Celular(id,marca,modelo,fabricante,dataLancamento,memoriaRAM,memoriaROM,resolucaoDaTela,preco);
                listaCelular[celular.posicaoNaLista] = celularAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaCelular.length; i++) {
                    if (celular.posicaoNaLista != i) {
                        novaLista.push(listaCelular[i]);
                    }
                }
                listaCelular = novaLista;
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
            linha.id+" - " +
            linha.marca+" - " +
            linha.modelo+" - " +
            linha.fabricante+" - " +
            linha.dataLancamento+" - " +
            linha.memoriaRAM+" - " +
            linha.memoriaROM+" - " +
            linha.resolucaoDaTela + " - " +
            linha.preco+"<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaCelular);
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

// Função para mostrar os dados do Celular nos campos
function mostrarDadosCelular(celular) {
    document.getElementById("inputId").value = celular.id;
    document.getElementById("inputMarca").value = celular.marca;
    document.getElementById("inputModelo").value = celular.modelo;
    document.getElementById("inputFabricante").value = celular.fabricante;
    document.getElementById("inputDataLancamento").value = celular.dataLancamento;
    document.getElementById("inputMemoriaRAM").value = celular.memoriaRAM;
    document.getElementById("inputMemoriaROM").value = celular.memoriaROM;
    document.getElementById("inputResolucao").value = celular.resolucaoDaTela;
    document.getElementById("inputPreco").value = celular.preco;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputMarca").value = "";
    document.getElementById("inputModelo").value = "";
    document.getElementById("inputFabricante").value = "";
    document.getElementById("inputDataLancamento").value = "";
    document.getElementById("inputMemoriaRAM").value = "";
    document.getElementById("inputMemoriaROM").value = "";
    document.getElementById("inputResolucao").value = "";
    document.getElementById("inputPreco").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("inputMarca").readOnly = soLeitura;
    document.getElementById("inputModelo").readOnly = soLeitura;
    document.getElementById("inputFabricante").readOnly = soLeitura;
    document.getElementById("inputDataLancamento").readOnly = soLeitura;
    document.getElementById("inputMemoriaRAM").readOnly = soLeitura;
    document.getElementById("inputMemoriaROM").readOnly = soLeitura;
    document.getElementById("inputResolucao").readOnly = soLeitura;
    document.getElementById("inputPreco").readOnly = soLeitura;
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

function idade(dataLancamento) {
    document.getElementById("inputDataLancamento").value = celular.dataLancamento;

    const lancamento = new Date(celular.dataLancamento);
    const dataAtual = new Date();
    let idade = Math.ceil((dataAtual - lancamento) / (1000 * 60 * 60 * 24));
    return idade;
}

function celuarMaisVelho() {
    let velho = "";
    let dias = 0;

    for (let i = 0; i < listaCelular.length; i++) {
        let celularAtual = listaCelular[i];
        let diasLancamento = idade(celularAtual.dataLancamento)

        if (diasLancamento > dias) {
            dias = diasLancamento;
            velho = celularAtual;
        }
    }

    const saida = document.getElementById("divAviso");
    if(velho) {
        saida.innerHTML = "Celu"
    }

    let texto = "";
    for (let i = 0; i < listaCelular.length; i++) {
        const linha = listaCelular[i];
        let velho = 
        texto +=
            linha.cpf + " - " +
            linha.nome + " - " +
            linha.mes1 + " - " +
            linha.mes2 + " - " +
            linha.mes3 + " - " +
            linha.mes4 + " - " +
            linha.mes5 + " - " +
            linha.mes6 + " - " +
            velho + "<br>";
    }
    document.getElementById("outputSaida").innerHTML = texto;
}
