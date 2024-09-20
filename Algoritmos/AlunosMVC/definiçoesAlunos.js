let listaAlunos = [];

function inserirNaLista() {
    const ra = document.getElementById("inputRa").value;
    const Nome = document.getElementById("inputNome").value;
    const n1 = document.getElementById("inputN1").value;
    const n2 = document.getElementById("inputN2").value;
    const n3 = document.getElementById("inputN3").value;
    const n4 = document.getElementById("inputN4").value;

    let alunos = new Alunos(ra, Nome, n1, n2, n3, n4);

    listaAlunos.push(alunos);

}


function listarAlunos() {
    document.getElementById("outputListaAlunos");
    outputListaAlunos.innerHTML = ''

    for (let i = 0; i < listaAlunos.length; i++) {
        let f = listaAlunos[i]
        outputListaAlunos.innerHTML += f.ra + " - " + f.nome + " - " + f.n1 +
            " - " + f.n2 + " - " + f.n3 + " - " + f.n4 + "<br>";
    }
}

function adicionarAlunos() {
    let aluno = new Alunos("1111", "Leo", "8", "10", "5", "3");
    listaAlunos.push(aluno);
    aluno = new Alunos("9999", "Uener", "8", "10", "5", "3");
    listaAlunos.push(aluno);
    aluno = new Alunos("7777", "Bluezão", "8", "10", "5", "3");
    listaAlunos.push(aluno);
    aluno = new Alunos("6666", "Reneu", "8", "10", "5", "3");
    listaAlunos.push(aluno);
    aluno = new Alunos("2222", "Bolsonaro", "8", "10", "5", "3");
    listaAlunos.push(aluno);
    return aluno;
}

function procurarRa(raProcurado, listaAlunos) {
    for (let i = 0; i < listaAlunos.length; i++) {
        const f = listaAlunos[i];
        if (f.ra == raProcurado) {
            return f;
        }
    }
    return null;
}
function raProcurar() {
    let oRaInformado = document.getElementById("inputRa").value;
    const f2 = procurarRa(oRaInformado, listaAlunos);
    if (f2 == null) {
        alert("não está na lista");
    } else {
        document.getElementById("inputNome").value = f2.nome;
        document.getElementById("inputN1").value = f2.n1;
        document.getElementById("inputN2").value = f2.n2;
        document.getElementById("inputN3").value = f2.n3;
        document.getElementById("inputN4").value = f2.n4;
    }
}