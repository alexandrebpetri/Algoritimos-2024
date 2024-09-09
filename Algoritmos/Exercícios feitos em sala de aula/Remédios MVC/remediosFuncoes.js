let listaDeRemedios = [];
adicionarRemediosNaLista();

function listarRemedio () {
    let saida = document.getElementById("outputListaDeRemedios");
    saida.innerHTML = "";
    for (let i = 0; i < listaDeRemedios.length; i++) {
        remedio = listaDeRemedios[i];
        saida.innerHTML+=
        remedio.id + " - " +
        remedio.nome + " - " +
        remedio.peso + " - " +
        remedio.fabricante + " - " +
        remedio.dataFabricacao + "<br>";
    }
}

function adicionarRemediosNaLista() {
    let linha = new Remedio (
        1, "Aspirina", 10, "Bayer", '2024-01-13'
    );
    listaDeRemedios.push(linha);

    linha = new Remedio(
        3, "Insulina", 11, "Sandoz", '2024-01-20'
    )
    listaDeRemedios.push(linha);

    linha = new Remedio(
        5, "Ritalina", 8, "phizer", '2024-03-20'
    )
    listaDeRemedios.push(linha);
}