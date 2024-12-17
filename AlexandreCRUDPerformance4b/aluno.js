class Aluno {
    constructor(ra, nome, dataNascimento, notaCrudTemaLivre, notaInovacao, notaCrudPerformance, notaQ2, notaQ3, nota4Bim, posicaoNaLista) {
        this.ra = ra;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.notaCrudTemaLivre = notaCrudTemaLivre;
        this.notaInovacao = notaInovacao;
        this.notaCrudPerformance = notaCrudPerformance;
        this.notaQ2 = notaQ2;
        this.notaQ3 = notaQ3;
        this.nota4Bim = nota4Bim;

        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão
    }
 }
 