class Pessoa {
    constructor(cpf, nome, dataNascimento, altura) {
        this.cpf = cpf;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.altura = altura;
    }
}
function pessoas (pessoa) {
    pessoa.push(new Pessoa("111", "Leo", "2008-10-11", "1.73"));
    pessoa.push(new Pessoa("222", "Theo", "2009-05-03", "1.86"));
    pessoa.push(new Pessoa("333", "Kaio", "2009-08-10", "1.70"));
    pessoa.push(new Pessoa("999", "Uener", "2008-03-07", "1.77"));
    pessoa.push(new Pessoa("666", "Reltih", "1945-06-06", "6.66"));
    pessoa.push(new Pessoa("217", "Bolsonaro", "1955-03-21", "1.85"));
    pessoa.push(new Pessoa("000", "Bluezão", "666-03-21", "0.02"));
    return pessoa;
}


function funcaoNomes(pessoa) {
    let nomes = []
    for (let i = 0; i < pessoa.length; i++) {
        nomes.push(pessoa[i].nome);
    }
    return nomes;
}

function nomesAlt (pessoa) {
    let NA = []
    for (let j = 0; j < pessoa.length; j++) {
        NA.push(pessoa[j].nome + " - " + pessoa[j].altura);
    }
    return NA;
}

function funcaoCpf (pessoa) {
    let CPF =[]
    for (let k = 0; k < pessoa.length; k++) {

    }
}

 let p = [];
 p = pessoas(p);
 let mn = funcaoNomes(p);
 let na = nomesAlt (p);
 let c = funcaoCpf (p)
 console.log(na);