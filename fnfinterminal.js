// Função principal do jogo
function main() {
    let play = 2; // 1 = jogar, 2 = sair
    let game = true; // continuar jogando 
    let power = 101; // energia eletrica
    let doorleft = 0; // 0 = aberta, 1 = fechada
    let doorright = 0; // 0 = aberta, 1 = fechada
    let turnos = 0;
    let tempo = 1;

    // animatronics
    let localbonnie = 1;
    let bonnieyou = false;
    let bonnielevel = 0;

    // Menu principal
    while (game) {
        console.clear();
        console.log("___▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄____");
        console.log("───█▒▒░░░░░░░░░▒▒█────");
        console.log("────█░░█░░░░░█░░█─────");
        console.log("─▄▄──█░░░▀█▀░░░█──▄▄──");
        console.log("█░░█─▀▄░░░░░░░▄▀─█░░█─");
        console.log("────────TEXK──────────");
        console.log("──────PRESENTS────────");
        console.log("──────────────────────");
        console.log("[1] JOGAR [2] SAIR");
        
        play = prompt("Escolha uma opção: ");
        if (play == 1) {
            // Reinicializar variáveis para o jogo
            power = 101;
            doorleft = 0;
            doorright = 0;
            turnos = 0;
            tempo = 1;
            localbonnie = 1;
            bonnieyou = false;
            bonnielevel = 4;

            while (game) {
                // Sistema dos animatronics
                let bonniespaw = Math.floor(Math.random() * 20);
                if (bonniespaw < bonnielevel) {
                    localbonnie += 1;
                }
                if (localbonnie == 4) {
                    bonnieyou = true;
                }

                // Sistema de turnos e tempo
                turnos += 1;
                if (turnos == 4) {
                    tempo = 1;
                } else if (turnos == 6) {
                    tempo = 2;
                    bonnielevel += 2;
                } else if (turnos == 14) {
                    tempo = 3;
                } else if (turnos == 16) {
                    tempo = 4;
                    bonnielevel += 2;
                } else if (turnos == 18) {
                    tempo = 5;
                    bonnielevel += 2;
                } else if (turnos == 24) {
                    tempo = 6;
                    bonnielevel += 2;
                }

                // Condição de vitória
                if (tempo == 6) {
                    console.log("Você sobreviveu à primeira noite");
                    break;
                }

                // Sistema de energia e animação
                if (doorleft == 0 && doorright == 0) {
                    if (bonnieyou) {
                        console.clear();
                        console.log("Bonnie está aqui!");
                        power -= 2;
                    } else {
                        console.clear();
                        console.log("Você está seguro.");
                        power -= 2;
                    }
                } else if (doorleft == 1 && doorright == 0) {
                    if (bonnieyou) {
                        console.clear();
                        console.log("Bonnie está aqui!");
                        power -= 2;
                    } else {
                        console.clear();
                        console.log("Você está seguro.");
                        power -= 4;
                    }
                } else if (doorleft == 0 && doorright == 1) {
                    if (bonnieyou) {
                        console.clear();
                        console.log("Bonnie está aqui!");
                        power -= 2;
                    } else {
                        console.clear();
                        console.log("Você está seguro.");
                        power -= 4;
                    }
                } else {
                    if (bonnieyou) {
                        console.clear();
                        console.log("Bonnie está aqui!");
                        power -= 12;
                    } else {
                        console.clear();
                        console.log("Você está seguro.");
                        power -= 12;
                    }
                }

                // Sistema de derrota
                if (power < 1) {
                    console.log("Você perdeu ! Sua energia acabou.");
                    break;
                }

                console.log(`Energia: ${power}`);
                console.log(`Hora: ${tempo}AM`);
                let menu = prompt("[1] Portas [2] Câmeras [3] Luzes [4] Esperar: ");
                
                if (menu == 1) { // Portas
                    let menuportas = prompt("[1] Fechar [2] Abrir: ");
                    if (menuportas == 1) {
                        let LeftorRigth = prompt("[1] Esquerda [2] Direita: ");
                        if (LeftorRigth == 1) {
                            doorleft = 1;
                        } else if (LeftorRigth == 2) {
                            doorright = 1;
                        }
                    } else if (menuportas == 2) {
                        let LeftorRigth = prompt("[1] Esquerda [2] Direita: ");
                        if (LeftorRigth == 1) {
                            doorleft = 0;
                        } else if (LeftorRigth == 2) {
                            doorright = 0;
                        }
                    }
                } else if (menu == 3) { // Luzes
                    let menuLuz = prompt("[1] Ligar [2] Desligar: ");
                    if (menuLuz == 1) {
                        let LeftorRigth = prompt("[1] Esquerda [2] Direita: ");
                        if (LeftorRigth == 1) {
                            doorleft = 1;
                        } else if (LeftorRigth == 2) {
                            doorright = 1;
                        }
                    } else if (menuLuz == 2) {
                        let LeftorRigth = prompt("[1] Esquerda [2] Direita: ");
                        if (LeftorRigth == 1) {
                            doorleft = 0;
                        } else if (LeftorRigth == 2) {
                            doorright = 0;
                        }
                    }
                }

                // Sistema de jump scare
                if (bonnieyou) {
                    let bonniejump = Math.floor(Math.random() * 11);
                    if (doorleft == 0) {
                        if (bonniejump <= 8) {
                            console.clear();
                            console.log("Jump scare! Você foi pego por Bonnie!");
                            game = false;
                            break;
                        }
                    }
                }
            }
        } else if (play == 2) {
            console.log("Saindo...");
            break;
        } else {
            console.log("Opção inválida. Saindo...");
            break;
        }
    }
}

// Iniciar o jogo
main();