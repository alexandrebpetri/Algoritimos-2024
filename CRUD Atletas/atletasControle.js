let listaAtleta = [];
let oQueEstaFazendo = '';
let atleta = null;

carregarAtletasPredefinidos(listaAtleta);
bloquearAtributos(true);

function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaAtleta.length; i++) {
        const atleta = listaAtleta[i];
        if (atleta.num == chave) {
            atleta.posicaoNaLista = i;
            return atleta;
        }
    }
    return null;
}

function procure() {
    const num = document.getElementById("inputNum").value;
    if (num) {
        atleta = procurePorChavePrimaria(num);
        if (atleta) {
            mostrarDadosAtleta(atleta);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none');
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else {
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputNum").focus();
    }
}

function carregarAtletasPredefinidos() {
    const atletasPredefinidos = [
        new Atleta('10', 'Carlos Silva', '1990-01-01', 'goleiro', 1.80, 78.8),
        new Atleta('29', 'Joaquim Souza', '1995-02-02', 'defensor', 1.75, 80.0),
        new Atleta('3', 'Maria Santos', '1998-03-03', 'meio-campista', 1.70, 75.0),
        new Atleta('41', 'Pedro Pereira', '2000-04-04', 'atacante', 1.85, 90.0),
        new Atleta('5', 'Ana Rodrigues', '2002-05-05', 'meio-campista', 1.65, 70.0)
    ];

    listaAtleta = atletasPredefinidos;
    listar();
}

function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clique no botão salvar");
}

function alterar() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clique no botão salvar");
}

function excluir() {
    if (confirm("Tem certeza que deseja excluir este atleta?")) {
        visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
        oQueEstaFazendo = 'excluindo';
        mostrarAviso("EXCLUINDO - Clique no botão salvar para confirmar a exclusão");
    }
}

function salvar() {
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

    if (num && nome && nascimento && posicao && altura && peso) {
        switch (oQueEstaFazendo) {
            case 'inserindo':
                atleta = new Atleta(num, nome, nascimento, posicao, altura, peso);
                listaAtleta.push(atleta);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                const atletaAlterado = new Atleta(num, nome, nascimento, posicao, altura, peso);
                listaAtleta[atleta.posicaoNaLista] = atletaAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                listaAtleta = listaAtleta.filter((_, i) => i !== atleta.posicaoNaLista);
                mostrarAviso("Excluído");
                break;
            default:
                mostrarAviso("Erro desconhecido");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
    } else {
        alert("Preencha todos os campos corretamente");
    }
}

function listar() {
    document.getElementById("outputSaida").innerHTML = listaAtleta.map(atleta =>
        `${atleta.num} - ${atleta.nome} - ${atleta.dataNascimento} - ${atleta.posicao} - ${atleta.altura}m - ${atleta.peso}kg`
    ).join('<br>');
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Operação cancelada");
}

function mostrarAviso(mensagem) {
    document.getElementById("divAviso").innerHTML = mensagem;
}

function mostrarDadosAtleta(atleta) {
    document.getElementById("inputNum").value = atleta.num;
    document.getElementById("inputNome").value = atleta.nome;
    document.getElementById("dataNascimento").value = atleta.dataNascimento;
    document.getElementById("selectPosicao").value = atleta.posicao;
    document.getElementById("inputAltura").value = atleta.altura;
    document.getElementById("inputPeso").value = atleta.peso;
}

function bloquearAtributos(soLeitura) {
    document.getElementById("inputNum").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("dataNascimento").readOnly = soLeitura;
    document.getElementById("selectPosicao").disabled = soLeitura;
    document.getElementById("inputAltura").readOnly = soLeitura;
    document.getElementById("inputPeso").readOnly = soLeitura;
}

function visibilidadeDosBotoes(procure, inserir, alterar, excluir, salvar) {
    document.getElementById("btProcure").style.display = procure;
    document.getElementById("btInserir").style.display = inserir;
    document.getElementById("btAlterar").style.display = alterar;
    document.getElementById("btExcluir").style.display = excluir;
    document.getElementById("btSalvar").style.display = salvar;
}

function limparAtributos() {
    document.getElementById("inputNum").value = '';
    document.getElementById("inputNome").value = '';
    document.getElementById("dataNascimento").value = '';
    document.getElementById("selectPosicao").value = 'selectOpc';
    document.getElementById("inputAltura").value = '';
    document.getElementById("inputPeso").value = '';
}
