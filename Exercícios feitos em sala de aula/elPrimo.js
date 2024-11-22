function ehPrimo(num) {
    let cont = 0;
    for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
            cont++;            
            if (cont > 2) {
                return false;
            }
        }
    }
    return true;
}

console.log(ehPrimo(3));

function encontrarPrimos(lista) {
    const primos = [];
    for (let i = 1; i < lista; i++) {
      if (ehPrimo(i)) {
        primos.push(i);
      }
    }
    return primos;
  }
  
  const primosEncontrados = encontrarPrimos(100);
  console.log(primosEncontrados);