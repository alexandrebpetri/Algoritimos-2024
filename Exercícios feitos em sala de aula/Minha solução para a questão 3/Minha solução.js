let listaConsumoAgua = [
    ['111', 'Maria Sofredora das Dores', 15, 10, 13, 22, 17, 21],
    ['222', 'José Reclamildo', 25, 15, 13, 20, 19, 18],
    ['333', 'Carlos dos Santos', 10, 10, 11, 9, 9, 11],
    ['444', 'Mario Contrarius', 18, 19, 17, 15, 17, 21],
    ['555', 'Cledhisley Hamilton Pereira', 25, 20, 32, 32, 33, 29]
];



function totalDeAguaConsumida() {
    let soma = 0;
    for (let i = 0; i < listaConsumoAgua.length; i++) {
        const cadaPessoa = listaConsumoAgua[i];
        
        for (let j = 2; j < cadaPessoa.length; j++) {
            soma += cadaPessoa[j];
        } 
    }
    console.log( " >>> " + soma + " metros cúbicos");
}

totalDeAguaConsumida();