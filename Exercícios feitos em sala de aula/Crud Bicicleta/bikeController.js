let listaBicicleta = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let bicicleta = null; //variavel global 
bloquearAtributos(true);
mostrarBicicletasPredefinidas(listaBicicleta);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaBicicleta.length; i++) {
        const bicicleta = listaBicicleta[i];
        if (bicicleta.id == chave) {
            bicicleta.posicaoNaLista = i;
            return listaBicicleta[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const id = document.getElementById("inputId").value;
    if (id) { // se digitou um id
        bicicleta = procurePorChavePrimaria(id);
        if (bicicleta) { //achou na lista
            mostrarDadosBicicleta(bicicleta);
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

function mostrarBicicletasPredefinidas() {
    const bicicletasPredefinidas = [
        new Bicicleta(1, "Mountain Bike", "Caloi", "2020-05-15", 1200, 13.5),
        new Bicicleta(2, "Speed Bike", "Specialized", "2019-03-20", 1500, 8.2),
        new Bicicleta(3, "BMX", "Monark", "2018-07-10", 800, 10.0),
        new Bicicleta(4, "City Bike", "Sense", "2021-09-01", 950, 12.3),
        new Bicicleta(5, "Elétrica", "Oggi", "2022-11-25", 3500, 18.7)
    ];
    listaBicicleta = bicicletasPredefinidas;
    listar(); // Atualiza a lista no output
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
    if (bicicleta == null) {
        id = document.getElementById("inputId").value;
    } else {
        id = bicicleta.id;
    }

    const nome = document.getElementById("inputNome").value;
    const fabricante = document.getElementById("inputFabricante").value;
    const lancamento = document.getElementById("inputLancamento").value;
    const preco = document.getElementById("inputPreco").value;
    const peso = document.getElementById("inputPeso").value;
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (id && nome && fabricante && lancamento && preco && peso) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                bicicleta = new Bicicleta(id, nome, fabricante, lancamento, preco, peso);
                listaBicicleta.push(bicicleta);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                bicicletaAlterada = new Bicicleta(id, nome, fabricante, lancamento, preco, peso);
                listaBicicleta[bicicleta.posicaoNaLista] = bicicletaAlterada;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaBicicleta.length; i++) {
                    if (bicicleta.posicaoNaLista != i) {
                        novaLista.push(listaBicicleta[i]);
                    }
                }
                listaBicicleta = novaLista;
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
            linha.fabricante + " - " +
            linha.lancamento + " - " +
            linha.preco + " - " +
            linha.peso + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaBicicleta);
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

// Função para mostrar os dados do bicicleta nos campos
function mostrarDadosBicicleta(bicicleta) {
    document.getElementById("inputId").value = bicicleta.id;
    document.getElementById("inputNome").value = bicicleta.nome;
    document.getElementById("inputFabricante").value = bicicleta.fabricante;
    document.getElementById("inputLancamento").value = bicicleta.lancamento;
    document.getElementById("inputPreco").value = bicicleta.preco;
    document.getElementById("inputPeso").value = bicicleta.peso;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputFabricante").value = "";
    document.getElementById("inputLancamento").value = "";
    document.getElementById("inputPreco").value = "";
    document.getElementById("inputPeso").value = "";
    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputFabricante").readOnly  = soLeitura;
    document.getElementById("inputLancamento").readOnly = soLeitura;
    document.getElementById("inputPreco").readOnly = soLeitura;
    document.getElementById("inputPeso").readOnly = soLeitura;
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

function selecionarBicicletasPorPeso(pesoMaximo) {
    const bicicletasFiltradas = [];

    for (let i = 0; i < bicicletas.length; i++) {
        const bicicleta = bicicletas[i];
        if (bicicleta.peso < pesoMaximo) {
            bicicletasFiltradas.push(bicicleta);
        }
    }

    return bicicletasFiltradas;
}

function mostrarNomesDasBicicletasMaisBaratas() {
    let precoMinimo = bicicletas[0].preco;
    let nomesDasBicicletasMaisBaratas = [];

    for (let i = 0; i < bicicletas.length; i++) {
        const bicicleta = bicicletas[i];
        if (bicicleta.preco < precoMinimo) {
            precoMinimo = bicicleta.preco;
            nomesDasBicicletasMaisBaratas = [bicicleta.nome];
        } else if (bicicleta.preco === precoMinimo) {
            nomesDasBicicletasMaisBaratas.push(bicicleta.nome);
        }
    }

    return nomesDasBicicletasMaisBaratas;
}
