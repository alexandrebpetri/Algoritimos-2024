function gerarSequenciaHamming(limite) {
    // Array para armazenar a sequência de Hamming
    let num = [1];
    
    // Índices para multiplicar por 2, 3 e 5
    let i2 = 0, i3 = 0, i5 = 0;

    // Gerar os próximos números usando um laço `for`
    for (let contador = 1; contador < limite; contador++) {
        // Próximos valores possíveis multiplicados por 2, 3 e 5
        let prox2 = num[i2] * 2;
        let prox3 = num[i3] * 3;
        let prox5 = num[i5] * 5;

        // O próximo número Hamming é o menor dos três
        let proxnum = Math.min(prox2, prox3, prox5);
        num.push(proxnum);

        // Incrementar os índices usados
        if (proxnum === prox2) i2++;
        if (proxnum === prox3) i3++;
        if (proxnum === prox5) i5++;
    }

    return num;
}

// Exemplo de uso: gerar os primeiros 20 números da sequência de Hamming
let limite = 20;
let sequenciaHamming = gerarSequenciaHamming(limite);
console.log(`Os primeiros ${limite} números da sequência de Hamming são:`);
console.log(sequenciaHamming);
