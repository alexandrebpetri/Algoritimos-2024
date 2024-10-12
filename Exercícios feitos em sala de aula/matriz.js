function mediaAnual(vetor){
    let soma = 0;
    for (let i = 0; i < vetor.length; i++) {
        soma = soma + vetor[i];
    }
    return soma / vetor.length;
}

function mediaAnualDeVariosAlunos(matriz) {
    for (let i = 0; i < matriz.length; i++) {
        soma = 0;
        for (let j = 0; j < matriz[0].length; j++) {
            soma += matriz [i] [j];
        }
        console.log("Média do " + (i + 1) + "º aluno = " + soma / matriz[0].length);
    }
}

//let v = [8,7,8,7];
//let media = mediaAnual(v);
//console.log("A média anual é: " + media);

let matriz = [[6,7,8,6], [8,9,7,5], [9,9,9,9.5], [5,6,7,2], [6,7,6,7]];
mediaAnualDeVariosAlunos(matriz);