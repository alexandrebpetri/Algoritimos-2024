let codigoFonte = "";

function gerarModel() {
    let nomeClasse = document.getElementById("inputNomeClasse").value.trim();
    let atributos = document.getElementById("inputAtributos").value.toLowerCase().trim();
    let nomeClasseMaiuscula = nomeClasse.charAt(0).toUpperCase() + nomeClasse.slice(1);


    let vetAtributos = atributos.split(",");
    codigoFonte = "class " + nomeClasseMaiuscula + " {\n";

    codigoFonte += "   constructor(" + vetAtributos.join(", ") + ") {\n";
    for (let i = 0; i < vetAtributos.length; i++) {
        const at = vetAtributos[i].trim();
        codigoFonte += "       this." + at + " = " + at + ";\n";
    }
    codigoFonte += "       this.posicaoNaLista = null;\n";
    codigoFonte += "   }\n}\n";
    document.getElementById("taCodigoFonte").textContent = codigoFonte;
}

function gerarView() {
    // Obtém o nome da classe e os atributos informados
    let nomeClasse = document.getElementById("inputNomeClasse").value.trim();
    let atributos = document.getElementById("inputAtributos").value.trim().split(",").map(attr => attr.trim());
    let nomeClasseMaiuscula = nomeClasse.charAt(0).toUpperCase() + nomeClasse.slice(1);

    // Inicia o HTML do formulário
    codigoFonte = `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD ${nomeClasseMaiuscula}</title>
</head>
<body>
    <h1>Cadastro de ${nomeClasseMaiuscula}</h1>\n`;

    // Gera o campo para ID e botões de ação]
    for (let i = 0; i < 1; i++) {
        let chavePrimaria = atributos[i].toLowerCase();
        let chaveMaiuscula = chavePrimaria.charAt(0).toUpperCase() + chavePrimaria.slice(1);
    codigoFonte += `    <label for="input${chaveMaiuscula}">${chaveMaiuscula}:</label>
    <input type="number" name="input${chaveMaiuscula}" id="input${chaveMaiuscula}">
    <input type="button" value="Procure" id="btProcure" onclick="procure()" style="display:inline;">
    <input type="button" value="Inserir" id="btInserir" onclick="inserir()" style="display:none;">
    <input type="button" value="Alterar" id="btAlterar" onclick="alterar()" style="display:none;">
    <input type="button" value="Excluir" id="btExcluir" onclick="excluir()" style="display:none;">
    <br><br>\n`;
    }

    // Gera o formulário para cada atributo
    for (let i = 1; i < atributos.length; i++) {
        let attr = atributos[i].toLowerCase();
        let attrMaiusculo = attr.charAt(0).toUpperCase() + attr.slice(1);
        codigoFonte += `    <label for="input${attrMaiusculo}">${attrMaiusculo}:</label>
        <input type="text" name="input${attrMaiusculo}" id="input${attrMaiusculo}">
        <br>\n`;
    }
    

    // Adiciona a div para mensagens de aviso e botões de salvar/cancelar
    codigoFonte += `
    <br>
    <div id="divAviso" style="background-color: antiquewhite;"></div>
    <br>
    <input type="button" value="Salvar" id="btSalvar" onclick="salvar()" style="display:none;">
    <input type="button" value="Cancelar" id="btCancelar" onclick="cancelarOperacao()" style="display:none;">
    <br><br>

    <div id="outputSaida" style="background-color: aqua;">...</div>
</body>
</html>`;

    // Exibe o código gerado no textarea
    document.getElementById("taCodigoFonte").textContent = codigoFonte;
}

function gerarController() {
    let nomeClasse = document.getElementById("inputNomeClasse").value.trim().toLowerCase();
    let atributos = document.getElementById("inputAtributos").value.trim().split(",").map(attr => attr.trim());
    let nomeClasseMaiuscula = nomeClasse.charAt(0).toUpperCase() + nomeClasse.slice(1);

    for (let i = 0; i < 1; i++) { // Acessa apenas o primeiro elemento
        let chavePrimaria = atributos[i].toLowerCase().trim();
        let chaveMaiuscula = chavePrimaria.charAt(0).toUpperCase() + chavePrimaria.slice(1);
        
        codigoFonte = `// ${nomeClasseMaiuscula}Controller.js

let lista${nomeClasseMaiuscula} = []; // Conjunto de dados
let oQueEstaFazendo = ''; // Variável global de controle
let ${nomeClasse} = null; // Variável global
bloquearAtributos(true);

// Função para procurar um elemento pela chave primária
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < lista${nomeClasseMaiuscula}.length; i++) {
        const ${nomeClasse} = lista${nomeClasseMaiuscula}[i];
        if (${nomeClasse}.${chavePrimaria} == chave) {
            ${nomeClasse}.posicaoNaLista = i;
            return lista${nomeClasseMaiuscula}[i];
        }
    }
    return null; // Não achou
}

// Função para procurar um elemento
function procure() {
    const ${chavePrimaria} = document.getElementById("input${chaveMaiuscula}").value;
    if (isNaN(${chavePrimaria}) || !Number.isInteger(Number(${chavePrimaria}))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("input${chaveMaiuscula}").focus();
        return;
    }

    if (${chavePrimaria}) { // Se digitou um Id
        ${nomeClasse} = procurePorChavePrimaria(${chavePrimaria});
        if (${nomeClasse}) { // Achou na lista
            mostrarDados${nomeClasseMaiuscula}(${nomeClasse});
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { // Não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("input${chaveMaiuscula}").focus();
        return;
    }
}

// Função para inserir um novo elemento
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clique no botão salvar");
    document.getElementById("input${chaveMaiuscula}").focus();
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
    let ${chavePrimaria};
    if (${nomeClasse} == null) {
        ${chavePrimaria} = parseInt(document.getElementById("input${chaveMaiuscula}").value);
    } else {
        ${chavePrimaria} = ${nomeClasse}.${chavePrimaria};
    }

    // Declaração dos atributos
    `;
        
    for (let i = 1; i < atributos.length; i++) {
        let attr = atributos[i];
        let attrMaiusculo = attr.charAt(0).toUpperCase() + attr.slice(1);
        codigoFonte += `    const ${attr} = document.getElementById("input${attrMaiusculo}").value;\n    `;
    }

    codigoFonte += `
    if (${atributos.join(" && ")}) { // Se tudo está certo
        switch (oQueEstaFazendo) {
            case 'inserindo':
                ${nomeClasse} = new ${nomeClasseMaiuscula}(${atributos.join(", ")});
                lista${nomeClasseMaiuscula}.push(${nomeClasse});
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                const ${nomeClasse}Alterado = new ${nomeClasseMaiuscula}(${atributos.join(", ")});
                lista${nomeClasseMaiuscula}[${nomeClasse}.posicaoNaLista] = ${nomeClasse}Alterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < lista${nomeClasseMaiuscula}.length; i++) {
                    if (${nomeClasse}.posicaoNaLista != i) {
                        novaLista.push(lista${nomeClasseMaiuscula}[i]);
                    }
                }
                lista${nomeClasseMaiuscula} = novaLista;
                mostrarAviso("Excluído");
                break;
            default:
                mostrarAviso("Erro desconhecido");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("input${chaveMaiuscula}").focus();
    } else {
        alert("Erro nos dados digitados");
    }
}

// Função para listar todos os elementos
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(lista${nomeClasseMaiuscula});
}

// Função para preparar a listagem
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        let item = vetor[i];\n        `;
        
    for (let i = 0; i < atributos.length; i++) {
        let attr = atributos[i];
        codigoFonte += `texto += item.${attr} + " - ";\n        `;
    }
    
    codigoFonte += `
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

// Função para mostrar os dados do ${nomeClasseMaiuscula} nos campos
function mostrarDados${nomeClasseMaiuscula}(${nomeClasse}) {
    document.getElementById("input${chaveMaiuscula}").value = ${nomeClasse}.${chavePrimaria};
    `;
    
    for (let i = 1; i < atributos.length; i++) {
        let attr = atributos[i];
        let attrMaiusculo = attr.charAt(0).toUpperCase() + attr.slice(1);
        codigoFonte += `document.getElementById("input${attrMaiusculo}").value = ${nomeClasse}.${attr};\n    `;
    }

    codigoFonte += `
    bloquearAtributos(true);
}

// Função para limpar os campos do formulário
function limparAtributos() {\n    `;
    
    for (let i = 1; i < atributos.length; i++) {
        let attr = atributos[i];
        let attrMaiusculo = attr.charAt(0).toUpperCase() + attr.slice(1);
        codigoFonte += `document.getElementById("input${attrMaiusculo}").value = "";\n    `;
    }

    codigoFonte += `
    bloquearAtributos(true);
}

// Função para definir os campos como apenas leitura ou editáveis
function bloquearAtributos(soLeitura) {
    document.getElementById("input${chaveMaiuscula}").readOnly = !soLeitura;
    `;
    
    for (let i = 1; i < atributos.length; i++) {
        let attr = atributos[i];
        let attrMaiusculo = attr.charAt(0).toUpperCase() + attr.slice(1);
        codigoFonte += `document.getElementById("input${attrMaiusculo}").readOnly = soLeitura;\n    `;
    }

    codigoFonte += `
}

// Função para definir a visibilidade dos botões
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar;
    document.getElementById("input${chaveMaiuscula}").focus();
}
`;

    document.getElementById("taCodigoFonte").textContent = codigoFonte;
}
}