let listaAtleta = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let atleta = null; //variavel global 
carregarAtletasPredefinidos(listaAtleta);
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaAtleta.length; i++) {
        const atleta = listaAtleta[i];
        if (atleta.num == chave) {
            atleta.posicaoNaLista = i;
            return listaAtleta[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const num = document.getElementById("inputNum").value;
    if (num) { // se digitou um num
        atleta = procurePorChavePrimaria(num);
        if (atleta) { //achou na lista
            mostrarDadosAtleta(atleta);
            visibilidadeDosBotoes('none', 'none', 'inline', 'inline', 'inline', 'inline'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('none', 'inline', 'none', 'none', 'none', 'inline');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputNum").focus();
        return;
    }
}

//backend->frontend
function carregarAtletasPredefinidos() {
    const atletasPredefinidos = [
        new Atleta('10', 'Carlos Silva', '1990-01-01', 'goleiro', 1.80, 78.8),
        new Atleta('29', 'Joaquim Souza', '1995-02-02', 'defensor', 1.75, 80.0),
        new Atleta('3', 'Maria Santos', '1998-03-03', 'meio-campista', 1.70, 75.0),
        new Atleta('41', 'Pedro Pereira', '2000-04-04', 'atacante', 1.85, 90.0),
        new Atleta('5', 'Ana Rodrigues', '2002-05-05', 'meio-campista', 1.65, 70.0),
    ];

    listaAtleta = atletasPredefinidos;
    listar(); // Exibe os atletas na tela
}

function fazerDownload() {
    let nomeParaSalvar = "Atletas.csv";
    let textoCSV = "";
    for (let i = 0; i < listaAtleta.length; i++) {
        const atleta = listaAtleta[i];
        textoCSV += 
            atleta.num + ";" +
            atleta.nome + ";" +
            atleta.nascimento + ";" +
            atleta.posicao + ";" +
            atleta.altura + ";" +
            atleta.peso + "\n";
    }
    salvarEmArquivo(nomeParaSalvar, textoCSV);
}

function salvarEmArquivo(nomeDoArquivo, texto) {
    const blob = new Blob([texto], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = nomeDoArquivo;
    link.click();
    URL.revokeObjectURL(link.href);
}

function fazerUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.onchange = function(event) {
        const arquivo = event.target.files[0];
        console.log(arquivo.name);
        if (arquivo) {
            processarArquivo(arquivo);
        }
    }
    input.click();
}

function processarArquivo(arquivo) {
    const leitor = new FileReader();
    leitor.onload = function(event) {
        const conteudo = event.target.result;
        const linhas = conteudo.split("\n");
        listaAtleta = [];
        for (let i = 1; i < linhas.length; i++) {
            const linha = linhas[i].trim();
            if (linha) {
                const dados = linha.split(";");
                if (dados.length == 6) {
                    listaAtleta.push({
                        num: dados[0],
                        nome: dados[1],
                        nascimento: dados[2],
                        posicao: dados[3],
                        altura: dados[4],
                        peso: dados[5]
                    });
                }
            }
        }
        listar();
    }
    leitor.readAsText(arquivo);
}

function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputNum").focus();

}

// Função para alterar um elemento da lista
function alterar() {

    // Remove o readonly dos campos
    bloquearAtributos(false);

    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline', 'inline');

    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

// Função para excluir um elemento da lista
function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)

    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
    bloquearAtributos(true);
}

function salvar() {
    //gerencia operações inserir, alterar e excluir na lista

    // obter os dados a partir do html

    let num;
    if (atleta == null) {
        num = document.getElementById("inputNum").value;
    } else {
        num = atleta.num;
    }

    const nome = document.getElementById("inputNome").value;
    const nascimento = document.getElementById("dataNascimento").value;
    const posicao = document.getElementById("selectPosicao").value;
    const altura = parseFloat(document.getElementById("inputAltura").value);
    const peso = parseFloat(document.getElementById("inputPeso").value);
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (num > 0 && nome && nascimento && posicao && altura > 0 && peso > 0) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                atleta = new Atleta(num, nome, nascimento, posicao, altura, peso);
                listaAtleta.push(atleta);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                atletaAlterado = new Atleta(num, nome, nascimento, posicao, altura, peso);
                listaAtleta[atleta.posicaoNaLista] = atletaAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaAtleta.length; i++) {
                    if (atleta.posicaoNaLista != i) {
                        novaLista.push(listaAtleta[i]);
                    }
                }
                listaAtleta = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none', 'inline');
        limparAtributos();
        listar();
        document.getElementById("inputNum").focus();
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
            linha.num + " - " +
            linha.nome + " - " +
            linha.nascimento + " - " +
            linha.posicao + " - " +
            linha.altura + " - " +
            linha.peso + "<br>";
            }
    return texto;
}

//backend->frontend (interage com html)
    function listar() {
        const tbody = document.querySelector("#outputSaida tbody");
        tbody.innerHTML = ""; // Limpa a tabela antes de preencher
    
        listaAtleta.forEach(atleta => {
            const linha = document.createElement("tr");
    
            linha.innerHTML = `
                <td>${atleta.num}</td>
                <td>${atleta.nome}</td>
                <td>${atleta.nascimento}</td>
                <td>${atleta.posicao}</td>
                <td>${atleta.altura}</td>
                <td>${atleta.peso}</td>
            `;
    
            tbody.appendChild(linha);
        });
    }
    

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none', 'inline');
    mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
    //printa a mensagem na divAviso
        const divAviso = document.getElementById("divAviso");
        divAviso.innerHTML = mensagem;
        divAviso.style.display = 'block'; // Torna a div visível
    }

// Função para mostrar os dados do atleta nos campos
function mostrarDadosAtleta(atleta) {
    document.getElementById("inputNum").value = atleta.num;
    document.getElementById("inputNome").value = atleta.nome;
    document.getElementById("dataNascimento").value = atleta.nascimento;
    let posicaoSelect = document.getElementById("selectPosicao");
    let posicaoValue = atleta.posicao.toLowerCase(); // transforma em minúsculas para garantir a correspondência

    // Encontra a opção com o valor correspondente e seleciona-a
    for (let i = 0; i < posicaoSelect.options.length; i++) {
        if (posicaoSelect.options[i].value === posicaoValue) {
            posicaoSelect.selectedIndex = i;
            break;
        }
    }
    document.getElementById("inputAltura").value = atleta.altura;
    document.getElementById("inputPeso").value = atleta.peso;
    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("dataNascimento").value = "";
    document.getElementById("selectPosicao").value = "selectOpc";
    document.getElementById("inputAltura").value = "";
    document.getElementById("inputPeso").value = "";
    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputNum").disabled = !soLeitura;
    document.getElementById("inputNome").disabled = soLeitura;
    document.getElementById("dataNascimento").disabled = soLeitura;
    document.getElementById("selectPosicao").disabled = soLeitura;
    document.getElementById("inputAltura").disabled = soLeitura;
    document.getElementById("inputPeso").disabled = soLeitura;
}

// Função para deixar visível ou invisível os botões
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar, aviso) {
    //  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); 
    //none significa que o botão ficará invisível (visibilidade == none)
    //inline significa que o botão ficará visível 

    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar; // o cancelar sempre aparece junto com o salvar
    document.getElementById("divAviso").style.display = aviso;
    document.getElementById("inputNum").focus();
}