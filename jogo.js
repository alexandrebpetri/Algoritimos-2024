const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let energia = 100;
let turno = 1;
let animatronicoAtivo = false;

// Telas do jogo
const telas = {
    sala: `
▏   ┃╲  ╲                            ╱  ╱┃    ▏
▏   ┃█╲  ╲                          ╱  ╱ ┃    ▏
▏   ┃██╲  ╲                        ╱  ╱  ┃    ▏
▏   ┃███╲  ╲                      ╱  ╱   ┃    ▏
▏╔═╗┃███┃   ╲                    ╱   ┃   ┃    ▏
▏╚═╝┃███┃╭━━╮┃▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔┃╭━━╮┃   ┃██  ▏
▏╔═╗┃███┃┃░░┃┃                  ┃┃░░┃┃   ┃╔═╗ ▏
▏╚═╝┃███┃┃░░┃┃                  ┃┃░░┃┃╲ ╱┃╚═╝ ▏
▏   ┃███┃┃░░┃┃                  ┃┃░░┃┃   ┃    ▏
▏   ┃███┃╰━━╯┃                  ┃╰━━╯┃   ┃    ▏
▏   ┃███┃    ┃                  ┃    ┃   ┃    ▏
▏   ┃███┃    ┃                  ┃    ┃   ┃    ▏`,

    salaComAnimatronico: `
▏   ┃╲  ╲                            ╱  ╱┃    ▏
▏   ┃█╲  ╲                          ╱  ╱ ┃    ▏
▏   ┃██╲  ╲          👻           ╱  ╱  ┃    ▏
▏   ┃███╲  ╲                      ╱  ╱   ┃    ▏
▏╔═╗┃███┃   ╲                    ╱   ┃   ┃    ▏
▏╚═╝┃███┃╭━━╮┃▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔┃╭━━╮┃   ┃██  ▏
▏╔═╗┃███┃┃░░┃┃                  ┃┃░░┃┃   ┃╔═╗ ▏
▏╚═╝┃███┃┃░░┃┃                  ┃┃░░┃┃╲ ╱┃╚═╝ ▏
▏   ┃███┃┃░░┃┃                  ┃┃░░┃┃   ┃    ▏
▏   ┃███┃╰━━╯┃                  ┃╰━━╯┃   ┃    ▏
▏   ┃███┃    ┃                  ┃    ┃   ┃    ▏
▏   ┃███┃    ┃                  ┃    ┃   ┃    ▏`,

    salaComLuz: `
▏   ┃╲  ╲    💡💡💡💡💡💡💡💡    ╱  ╱┃    ▏
▏   ┃█╲  ╲    LUZ LIGADA!     ╱  ╱ ┃    ▏
▏   ┃██╲  ╲                  ╱  ╱  ┃    ▏
▏   ┃███╲  ╲                ╱  ╱   ┃    ▏
▏╔═╗┃███┃   ╲              ╱   ┃   ┃    ▏
▏╚═╝┃███┃╭━━╮┃▔▔▔▔▔▔▔▔▔▔▔▔┃╭━━╮┃   ┃██  ▏
▏╔═╗┃███┃┃░░┃┃            ┃┃░░┃┃   ┃╔═╗ ▏
▏╚═╝┃███┃┃░░┃┃            ┃┃░░┃┃╲ ╱┃╚═╝ ▏
▏   ┃███┃┃░░┃┃            ┃┃░░┃┃   ┃    ▏
▏   ┃███┃╰━━╯┃            ┃╰━━╯┃   ┃    ▏
▏   ┃███┃    ┃            ┃    ┃   ┃    ▏
▏   ┃███┃    ┃            ┃    ┃   ┃    ▏`,

    camera: `
╔══════════════════════════════════════╗
║     CÂMERA DE SEGURANÇA - CAM 01     ║
║                                      ║
║     ┃███┃╭━━╮┃                       ║
║     ┃███┃┃··┃┃                       ║
║     ┃███┃╰━━╯┃                       ║
║                                      ║
║     Monitorando...                   ║
╚══════════════════════════════════════╝`,

    gameOver: `
╔══════════════════════════════════════╗
║              GAME OVER               ║
║                                      ║
║              Te pegou!               ║
║                                      ║
╚══════════════════════════════════════╝`,

    vitoria: `
╔══════════════════════════════════════╗
║           VOCÊ VENCEU!               ║
║                                      ║
║    Sobreviveu até o amanhecer!       ║
║                                      ║
╚══════════════════════════════════════╝`
};

function limparTela() {
    console.clear();
}

function mostrarTela(nomeTela) {
    limparTela();
    console.log(telas[nomeTela]);
}

const iniciarJogo = () => {
    limparTela();
    console.log(`
╔══════════════════════════════════════╗
║        FIVE NIGHTS AT JS             ║
║                                      ║
║    Sobreviva até o amanhecer!        ║
║    Energia inicial: 100%             ║
║    Use os comandos com sabedoria     ║
║                                      ║
╚══════════════════════════════════════╝`);
    
    setTimeout(() => {
        proximoTurno();
    }, 3000);
};

const proximoTurno = () => {
    // Verificar se o jogo acabou
    if (energia <= 0) {
        mostrarTela('gameOver');
        console.log("Você ficou sem energia! O animatrônico pegou você. Fim de jogo.");
        rl.close();
        return;
    }

    if (turno >= 10) {
        mostrarTela('vitoria');
        console.log("Você sobreviveu até o amanhecer! Parabéns!");
        rl.close();
        return;
    }

    limparTela();
    if (animatronicoAtivo) {
        mostrarTela('salaComAnimatronico');
    } else {
        mostrarTela('sala');
    }
    
    console.log(`\nTurno ${turno} | Energia restante: ${energia}%`);
    animatronicoAtivo = Math.random() < 0.3;

    if (animatronicoAtivo) {
        console.log("⚠️ ALERTA! O animatrônico está se aproximando! ⚠️");
    }

    console.log('\nVocê quer (1) Monitorar ou (2) Usar Luz?');
    
    rl.question('Escolha sua ação: ', (acao) => {
        if (acao === '1') {
            monitorar();
        } else if (acao === '2') {
            usarLuz();
        } else {
            console.log("Ação inválida. Tente novamente.");
            proximoTurno();
        }
    });
};

const monitorar = () => {
    mostrarTela('camera');
    console.log("Monitorando câmeras...");
    energia -= 10;
    if (animatronicoAtivo) {
        console.log("⚠️ O animatrônico está muito perto! Você precisa agir rápido!");
    } else {
        console.log("Não havia animatrônico por perto.");
    }
    turno++;
    setTimeout(proximoTurno, 2000);
};

const usarLuz = () => {
    limparTela();
    console.log(`
    💡 USANDO LUZ 💡
    ----------------`);
    energia -= 20;
    if (animatronicoAtivo) {
        console.log("✨ Você afastou o animatrônico com sucesso! ✨");
    } else {
        console.log("Não havia animatrônico por perto.");
    }
    turno++;
    setTimeout(proximoTurno, 2000);
};

iniciarJogo();