function gerarSequenciaApolonio(limite) {
    // Início com um valor inicial arbitrário para o primeiro raio
    let raios = [1]; // Raio do primeiro círculo

    // Gerar os próximos raios usando uma fórmula simples
    for (let i = 1; i < limite; i++) {
        // Fórmula simplificada (exemplo): cada próximo raio é o anterior multiplicado por 2
        // Aqui estamos usando uma regra simples apenas para fins de demonstração
        let proximoRaio = raios[i - 1] * 2;
        raios.push(proximoRaio);
    }

    return raios;
}

// Exemplo de uso: gerar os primeiros 10 raios da sequência de Apolônio
let limite = 10;
let sequenciaApolonio = gerarSequenciaApolonio(limite);
console.log(`Os primeiros ${limite} raios da sequência de Apolônio são:`);
console.log(sequenciaApolonio);
