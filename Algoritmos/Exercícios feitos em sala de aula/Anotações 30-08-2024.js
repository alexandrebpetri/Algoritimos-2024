
class Carro {
    constructor(placa, nome, dataLançamento) {
        this.placa = placa;
        this.nome = nome;
        this.dataLançamento = dataLançamento;
    }
}
    let carros = [];
carros.push(new Carro("ABC-1234", "Fusca", "1974-01-01"));
carros.push(new Carro("DEF-5678", "Civic", "2008-05-15"));
carros.push(new Carro("GHI-9101", "Mustang", "2019-07-01"));
carros.push(new Carro("zzz-1212", "Cadilac", "1950-07-01"));
carros.push(new Carro("www-0987", "BMW z6", "2023-07-01"));

//console.log(carros[1].nome);
for (let i = 0; i < carros.length; i++) {
    console.log(carros[i].placa + " - "
        + carros[i].nome);
}

