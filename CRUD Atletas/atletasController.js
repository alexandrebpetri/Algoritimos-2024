let listaAtleta = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let atleta = null; //variavel global 
carregarAtletasPredefinidos(listaAtleta);
bloquearAtributos(true);
configurarInputsNumericos();

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
            visibilidadeDosBotoes('none', 'none', 'inline', 'inline', 'none', 'inline', 'inline'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
            document.getElementById("inputNum").readOnly = true;
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('none', 'inline', 'none', 'none', 'none', 'inline', 'inline');
            mostrarAviso("Não achou na lista, pode inserir");
            document.getElementById("inputNum").readOnly = true;
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
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();
            if (linha) {
                const dados = linha.split(";");
                if (dados.length == 6) {
                    listaAtleta.push(new Atleta(dados[0], dados[1], dados[2], dados[3], parseFloat(dados[4]), parseFloat(dados[5])));
                }
            }
        }
        listar();
    }
    leitor.readAsText(arquivo);
}

function inserir() {
    const id = parseInt(document.getElementById("inputNum").value);
    if (procurePorChavePrimaria(id) != null) {
        mostrarAviso("Já existe um atleta com esse número, digite outro número");
    } else {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputNum").focus();
    }
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
                mostrarAviso("Inserido na lista", 5000);
                break;
            case 'alterando':
                atletaAlterado = new Atleta(num, nome, nascimento, posicao, altura, peso);
                listaAtleta[atleta.posicaoNaLista] = atletaAlterado;
                mostrarAviso("Alterado", 5000);
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaAtleta.length; i++) {
                    if (atleta.posicaoNaLista != i) {
                        novaLista.push(listaAtleta[i]);
                    }
                }
                listaAtleta = novaLista;
                mostrarAviso("EXCLUIDO", 5000);
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none', 'none', 'inline');
        limparAtributos();
        listar();
        document.getElementById("inputNum").focus();
    } else {
        alert("Erro nos dados digitados");
        return;
    }
}

//backend

function listar() {
    // Seleciona o tbody da tabela onde os dados serão inseridos
    const tbody = document.getElementById("outputSaida").getElementsByTagName("tbody")[0];
    let html = ""; // Variável para construir o HTML das linhas

    // Itera sobre cada atleta na lista
    for (let i = 0; i < listaAtleta.length; i++) {
        const atleta = listaAtleta[i];

        // Corrige a capitalização da posição
        const posicaoFormatada = atleta.posicao.charAt(0).toUpperCase() + atleta.posicao.slice(1).toLowerCase();

        // Constrói a linha HTML com os dados do atleta
        html += `
            <tr>
                <td>${atleta.num}</td>
                <td>${atleta.nome}</td>
                <td>${atleta.nascimento}</td>
                <td>${posicaoFormatada}</td>  <!-- Mostra a posição com a primeira letra maiúscula -->
                <td>${atleta.altura.toFixed(2)}</td>
                <td>${atleta.peso.toFixed(1)}</td>
            </tr>
        `;
    }

    // Define o HTML construído diretamente no tbody
    tbody.innerHTML = html;
}


//backend->frontend (interage com html)

    

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none', 'none', 'inline');
    mostrarAviso("Cancelou a operação de edição" , 5000);
}

function mostrarAviso(mensagem, tempo) {
    //printa a mensagem na divAviso
        const divAviso = document.getElementById("divAviso");
        divAviso.innerHTML = mensagem;
        divAviso.style.display = 'block'; // Torna a div visível

        if (tempo) {
            setTimeout(function() { 
                divAviso.style.display = 'none'; // Torna a div invisível
            }, tempo); 
    }

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
    document.getElementById("inputNum").readOnly = false;
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
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar,btCancelar,  aviso) {
    //  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); 
    //none significa que o botão ficará invisível (visibilidade == none)
    //inline significa que o botão ficará visível 

    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btCancelar; // o cancelar sempre aparece junto com o salvar
    document.getElementById("divAviso").style.display = aviso;
    document.getElementById("inputNum").focus();
}

//Função para validar a entrada numerica
function validarEntradaNumerica(event) {
    const tecla = event.key;
    const input = event.target;

    // Permite Backspace, Delete, Tab, Esc, Enter, e setas
    if (
        tecla === 'Backspace' || tecla === 'Delete' || 
        tecla === 'Tab' || tecla === 'Escape' || tecla === 'Enter' || 
        tecla === 'ArrowLeft' || tecla === 'ArrowRight'
    ) {
        return; // Permite essas teclas
    }

    // Verifica se o input é de altura ou peso
    if (input.id === 'inputAltura' || input.id === 'inputPeso') {
        // Permite as teclas de ponto e vírgula
        if (tecla === '.' || tecla === ',') {
            return;
        }
    }

    // Bloqueia qualquer tecla que não seja de 0 a 9, ou as específicas 'e', 'E', '+', '-'
    if ((tecla < '0' || tecla > '9') || tecla === 'e' || tecla === 'E' || tecla === '+' || tecla === '-') {
        event.preventDefault(); // Impede a entrada
    }
}

// Função para configurar os inputs do tipo 'number'
function configurarInputsNumericos() {
    // Seleciona todos os inputs do tipo 'number'
    const inputsNumericos = document.querySelectorAll('input[type="number"]');

    // Adiciona o evento 'keydown' para cada input
    for (let i = 0; i < inputsNumericos.length; i++) {
        inputsNumericos[i].addEventListener('keydown', validarEntradaNumerica);
    }
}