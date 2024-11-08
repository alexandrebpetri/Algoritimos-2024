function fazerDownload() {
    let nomeParaSalvar = "./Atletas.csv";
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
        exibirAtletas();
    }
    leitor.readAsText(arquivo);
}