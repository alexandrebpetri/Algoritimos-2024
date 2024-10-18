function procurarPorNum(numProcurado, listaDeAtletas) {
    for (let index = 0; index < listaDeAtletas.length; index++) {
        if (listaDeAtletas[index].num == numProcurado) {
            return listaDeAtletas[index];
        }
    }
    return null;
}
function procurarPorNum(numProcurado, listaDeAtletas) {
    for (let index = 0; index < listaDeAtletas.length; index++) {
        if (listaDeAtletas[index].num == numProcurado) {
            return listaDeAtletas[index];
        }
    }
    return null;
}

function procure() {
    const atleta = procurarPorNum(document.getElementById('num').value, listaDeAtletas);
    if (atleta) {
        document.getElementById('nome').value = atleta.nome;
        document.getElementById('dataNascimento').value = atleta.dataNascimento;
        document.getElementById('selectPosicao').value = atleta.posicao;
        document.getElementById('altura').value = atleta.altura;
        document.getElementById('peso').value = atleta.peso;
    } else {
        alert("Número não encontrado na lista de atletas");
    }
}

function preencherComDadosALista(listaDeAtletas) {
    listaDeAtletas.push(new Atleta('10', 'Carlos Silva', '1990-01-01', 'goleiro', 1.80, 78.8));
    listaDeAtletas.push(new Atleta('9', 'João Souza', '1985-05-23', 'atacante', 1.75, 70));
    listaDeAtletas.push(new Atleta('5', 'Ana Pereira', '1992-08-14', 'meio-campista', 1.68, 60));
    listaDeAtletas.push(new Atleta('4', 'Carlos Lima', '1988-02-17', 'defensor', 1.80, 80));
    listaDeAtletas.push(new Atleta('7', 'Paula Almeida', '1995-12-30', 'meio-campista', 1.70, 65));
    return listaDeAtletas;
}

function adicionarAtleta() {
    const num = document.getElementById('num').value;
    const nome = document.getElementById('nome').value.trim();
    const dataNascimento = document.getElementById('dataNascimento').value;
    const posicao = document.getElementById('selectPosicao').value;
    const alturaInput = document.getElementById('altura').value.trim();
    const pesoInput = document.getElementById('peso').value.trim();
    const altura = parseFloat(alturaInput);
    const peso = parseFloat (pesoInput);

    if (num && nome && dataNascimento && posicao && altura && peso && !isNaN(altura) && !isNaN(peso)) {
        const atleta = new Atleta(num, nome, dataNascimento, posicao, altura, peso);
        listaDeAtletas.push(atleta);
        exibirAtletas();
        limparCampos();
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

function exibirAtletas() {
    const atletasList = document.getElementById('outputListaDeAtletas');
    atletasList.innerHTML = ''; // Limpa o conteúdo da tabela

    for (let i = 0; i < listaDeAtletas.length; i++) {
        const atleta = listaDeAtletas[i];
        const row = `<tr>
                        <td>${atleta.num}</td>
                        <td>${atleta.nome}</td>
                        <td>${atleta.posicao}</td>
                        <td>${atleta.altura}</td>
                        <td>${atleta.peso}</td>
                        <td>${atleta.dataNascimento}</td>
                     </tr>`;
        atletasList.innerHTML += row;
    }
}

function limparCampos() {
    document.getElementById('num').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('dataNascimento').value = '';
    document.getElementById('selectPosicao').value = 'selectOpc';
    document.getElementById('altura').value = '';
    document.getElementById('peso').value = ''
}

let listaDeAtletas = [];
listaDeAtletas = preencherComDadosALista(listaDeAtletas); // Carrega os dados iniciais

// Exibe a lista inicial ao carregar a página
window.onload = exibirAtletas;