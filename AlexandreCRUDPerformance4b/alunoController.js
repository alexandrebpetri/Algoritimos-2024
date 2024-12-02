let listaAluno = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let aluno = null; //variavel global 
carregarAlunosPredefinidos(listaAluno);
bloquearAtributos(true);
configurarInputsNumericos();

//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaAluno.length; i++) {
        const aluno = listaAluno[i];
        if (aluno.ra == chave) {
            aluno.posicaoNaLista = i;
            return listaAluno[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const ra = document.getElementById("inputRA").value;
    if (ra) { // se digitou um ra
        aluno = procurePorChavePrimaria(ra);
        if (aluno) { //achou na lista
            mostrarDadosAluno(aluno);
            visibilidadeDosBotoes('none', 'none', 'inline', 'inline', 'none', 'inline', 'inline'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
            document.getElementById("inputRA").readOnly = true;
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('none', 'inline', 'none', 'none', 'none', 'inline', 'inline');
            mostrarAviso("Não achou na lista, pode inserir");
            document.getElementById("inputRA").readOnly = true;
        }
    } else {
        document.getElementById("inputRA").focus();
        return;
    }
}

//backend->frontend
function carregarAlunosPredefinidos() {
    const alunosPredefinidos = [
        new Aluno('a123', 'Alexandre', '2009-05-11', 10, 10, 10, 10, 10),
    ];

    listaAluno = alunosPredefinidos;
    listar(); // Exibe os atletas na tela
}

function fazerDownload() {
    let nomeParaSalvar = "Alunos.csv";
    let textoCSV = "";
    for (let i = 0; i < listaAluno.length; i++) {
        const aluno = listaAluno[i];
        textoCSV += 
            aluno.ra + ";" +
            aluno.nome + ";" +
            aluno.dataNascimento + ";" +
            aluno.notaCrudTemaLivre + ";" +
            aluno.notaInovacao + ";" +
            aluno.notaCrudPerformance + ";" +
            aluno.notaQ2 + ";" + 
            aluno.notaQ3 + "\n";
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
        listaAluno = [];
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();
            if (linha) {
                const dados = linha.split(";");
                if (dados.length == 8) {
                    listaAluno.push(new Aluno(dados[0], dados[1], dados[2], parseFloat(dados[3]), parseFloat(dados[4]), parseFloat(dados[5]), parseFloat(dados[6]), parseFloat(dados[7])));
                } 
            }
        }
        listar();
    }
    leitor.readAsText(arquivo);
}

function inserir() {
    const id = parseInt(document.getElementById("inputRA").value);
    if (procurePorChavePrimaria(id) != null) {
        mostrarAviso("Já existe um aluno com esse número, digite outro número");
    } else {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputRA").focus();
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

//gerencia operações inserir, alterar e excluir na lista

function salvar() {


    // obter os dados a partir do html

    let ra;
    if (aluno == null) {
        ra = document.getElementById("inputRA").value;
    } else {
        ra = aluno.ra;
    }

    const nome = document.getElementById("inputNome").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const notaCrudTemaLivre = parseFloat(document.getElementById("inputTemaLivre").value);
    const notaInovacao = parseFloat(document.getElementById("inputInovacao").value);
    const notaCrudPerformance = parseFloat(document.getElementById("inputPerformance").value);
    const notaQ2 = parseFloat(document.getElementById("inputQ2").value);
    const notaQ3 = parseFloat(document.getElementById("inputQ3").value); 
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (ra && nome && dataNascimento && notaCrudTemaLivre && notaInovacao && notaCrudPerformance && notaQ2 && notaQ3) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                aluno = new Aluno(ra, nome, dataNascimento, notaCrudTemaLivre, notaInovacao, notaCrudPerformance, notaQ2, notaQ3);
                listaAluno.push(aluno);
                mostrarAviso("Inserido na lista", 5000);
                break;
            case 'alterando':
                atletaAlterado = new Aluno(ra, nome, dataNascimento, notaCrudTemaLivre, notaInovacao, notaCrudPerformance, notaQ2, notaQ3);
                listaAluno[aluno.posicaoNaLista] = atletaAlterado;
                mostrarAviso("Alterado", 5000);
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaAluno.length; i++) {
                    if (aluno.posicaoNaLista != i) {
                        novaLista.push(listaAluno[i]);
                    }
                }
                listaAluno = novaLista;
                mostrarAviso("EXCLUIDO", 5000);
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none', 'none', 'inline');
        limparAtributos();
        listar();
        document.getElementById("inputRA").focus();
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

    // Itera sobre cada aluno na lista
    for (let i = 0; i < listaAluno.length; i++) {
        const aluno = listaAluno[i];

        // Constrói a linha HTML com os dados do aluno
        html += `
            <tr>
                <td>${aluno.ra}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.dataNascimento}</td>
                <td>${aluno.notaCrudTemaLivre.toFixed(1)}</td>
                <td>${aluno.notaInovacao.toFixed(1)}</td>
                <td>${aluno.notaCrudPerformance.toFixed(1)}</td>
                <td>${aluno.notaQ2.toFixed(1)}</td>
                <td>${aluno.notaQ3.toFixed(1)}</td>
                <td>${aluno.nota4Bim.toFixed(1) }</td>
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

// Função para mostrar os dados do aluno nos campos
function mostrarDadosAluno(aluno) {
    document.getElementById("inputRA").value = aluno.ra;
    document.getElementById("inputNome").value = aluno.nome;
    document.getElementById("dataNascimento").value = aluno.dataNascimento;
    document.getElementById("inputTemaLivre").value = aluno.notaCrudTemaLivre;
    document.getElementById("inputInovacao").value = aluno.notaInovacao;
    document.getElementById("inputPerformance").value = aluno.notaCrudPerformance;
    document.getElementById("inputQ2").value = aluno.notaQ2;
    document.getElementById("inputQ3").value = aluno.notaQ3;
    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputRA").readOnly = false;
    document.getElementById("inputNome").value = "";
    document.getElementById("dataNascimento").value = "";
    document.getElementById("inputTemaLivre").value = "";
    document.getElementById("inputInovacao").value = "";
    document.getElementById("inputPerformance").value = "";
    document.getElementById("inputQ2").value = "";
    document.getElementById("inputQ3").value = "";
    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputRA").disabled = !soLeitura;
    document.getElementById("inputNome").disabled = soLeitura;
    document.getElementById("dataNascimento").disabled = soLeitura;
    document.getElementById("inputTemaLivre").disabled = soLeitura;
    document.getElementById("inputInovacao").disabled = soLeitura;
    document.getElementById("inputPerformance").disabled = soLeitura;
    document.getElementById("inputQ2").disabled = soLeitura;
    document.getElementById("inputQ3").disabled = soLeitura;
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
    document.getElementById("inputRA").focus();
}

//Função para validar a entrada numerica
function validarEntradaNumerica(event) {
    const tecla = event.key;
    const input = event.target;

    // Permite Backspace, Delete, Tab, Esc, Enter, setas e . e ,
    if (
        tecla === 'Backspace' || tecla === 'Delete' || 
        tecla === 'Tab' || tecla === 'Escape' || tecla === 'Enter' || 
        tecla === 'ArrowLeft' || tecla === 'ArrowRight' || 
        tecla === '.' || tecla === ','
    ) {
        return; // Permite essas teclas
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

// função que possibilita o calculo da nota do quarto bimestre para cada aluno
function nota4Bimestre() {
    for (let i = 0; i < listaAluno.length; i++) {
        const aluno = listaAluno[i];
        aluno.nota4Bim = (((aluno.notaCrudTemaLivre + aluno.notaInovacao) / 2) + ((aluno.notaCrudPerformance + aluno.notaQ2 + aluno.notaQ3)/ 3)) / 2;
    }
    listar().aluno[aluno.posicaoNaLista].nota4Bim = aluno.nota4Bim.toFixed(1);
}