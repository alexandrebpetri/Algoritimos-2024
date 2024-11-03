int main(int argc, char const *argv[])
{
    int play = 2; // 1 = jogar 2 = sair
    bool game = true; // continuar jogando 
    int power = 101; // energia eletrica
    int doorleft = 0; // 0 = aberta 1 = fechada
    int doorrigth = 0; // 0 = aberta 1 = fechada
    // tempo 
    // cada noite vai ser 24 turnos
    int turnos = 0;
    int tempo = 1;

    // animatronics
    // bonnie
    int localbonnie = 1;
    bool bonnieyou = false;
    int bonnielevel = 0;
    int bonniespaw;
    int bonniexit;

    while (game){
        
        int menu = 0;
        int menuportas = 0;

        // animação inicial
        system("clear");
        std::cout << "___▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄____\n";
        std::cout << "───█▒▒░░░░░░░░░▒▒█────\n";
        std::cout << "────█░░█░░░░░█░░█─────\n";
        std::cout << "─▄▄──█░░░▀█▀░░░█──▄▄──\n";
        std::cout << "█░░█─▀▄░░░░░░░▄▀─█░░█─\n";
        std::cout << "────────TEXK──────────\n";
        std::cout << "──────PRESENTS────────\n";
        std::cout << "──────────────────────\n";
        std::cout << "=─=─=─=─=─=─=─=─=─=─=─\n";
        std::cout << "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n";
        std::cout << "░░████░███░░░██░████░████░░░░░░░░░\n";
        std::cout << "░░██░░░████░░██░██░░░░░██░░░╦░╔╗║░\n";
        std::cout << "░░████░██░██░██░████░░░██░░░╩░║╚╝░\n";
        std::cout << "░░██░░░██░░████░██░░░░░██░░░═════░\n";
        std::cout << "░░██░░░██░░░███░██░░░██████░░░░░░░\n";
        std::cout << "░╔╗═══════════════════════╗░░░░░░░\n";
        std::cout << "░║╚╗╔═╗╔╦╗╔══╗╔╗╔══╗╔═╗╔╗░░░░░░░░░\n";
        std::cout << "░║╔╣║╩╣║╔╣║║║║║║║╔╗║║╬║║╚╗░░░░░░░░\n";
        std::cout << "░╚═╝╚═╝╚╝ ╚╩╩╝╚╝╚╝╚╝╚╩╝╚═╝░░░░░░░░\n";
        std::cout << "░BY░MATHEUS░░░░░░░░░░░░░░░░░░░░░░░\n";
        std::cout << "░[1]░JOGAR░[2]░SAIR░░░░░░░░░░░░░░░\n";
        std::cout << "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n";

        std::cout << "[1] jogar [2] sair: ";
        std::cin >> play;
        if (play == 1){
            int power = 101; // energia eletrica
            int doorleft = 0; // 0 = aberta 1 = fechada
            int doorrigth = 0; // 0 = aberta 1 = fechada
            // tempo 
            // cada noite vai ser 10 turnos
            int turnos = 0;
            int tempo = 1;

            // animatronics
            // bonnie
            int localbonnie = 1;
            bool bonnieyou = false;
            int bonnielevel = 4;
            int bonniespaw;
            int bonniejump = 0;
            int bonnieexit = 0;

            while (game)
            {
                //sistema dos animatronics
                srand(time(0));
                bonniespaw = rand()%20; // 0 1 2 3 4 5 6 7 8 9
                std::cout << bonniespaw;
                if (bonniespaw < bonnielevel){
                    localbonnie += 1;
                }
                else {
                    localbonnie = localbonnie;
                }
                if (localbonnie == 4){
                    bonnieyou = true;
                }
                std::cout << bonnieyou;

                // sistema de turnos e tempo
                turnos += 1;
                if (turnos == 4){
                    tempo = 1;
                }
                else if (turnos == 6)
                {
                    tempo = 2;
                    bonnielevel += 2;
                }
                else if (turnos == 14){
                    tempo = 3;
                }
                else if (turnos == 16){
                    tempo = 4;
                    bonnielevel += 2;
                }
                else if (turnos == 18){
                    tempo = 5;
                    bonnielevel += 2;
                }
                else if (turnos == 24){
                    tempo = 6;
                    bonnielevel += 2;
                }
                // condição de vitoria
                if (tempo == 6){
                    std::cout << "você sobrevivel a primeira noite\n";
                    break;
                }
                //sistema de energia
                //sistema de animação
                if (doorleft == 0){ // se porta left tiver aberta
                    if (doorrigth == 0){ // e porta rigth tiver aberta
                        if (bonnieyou == true){ // e o bonnieyou (bonnie e você) tiver verdadeiro
                            system("clear");
                            std::cout << "______________________________________________\n";
                            std::cout << "▏   ┃╲  ╲                            ╱  ╱┃    ▏\n";
                            std::cout << "▏   ┃█╲ ▒╲  ▒                       ╱  ╱█┃    ▏\n";
                            std::cout << "▏   ┃██▓▒ ╲▓▒                      ╱  ╱██┃    ▏\n";
                            std::cout << "▏   ┃██▓▒  ▓▒                     ╱  ╱███┃    ▏\n";
                            std::cout << "▏╔═╗┃██▒▒▒▒▒▒                    ╱   ┃███┃╔═╗ ▏\n";
                            std::cout << "▏╚═╝┃█▒▒█▒▒█▒▒▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔┃╭━━╮┃███┃╚═╝ ▏\n";
                            std::cout << "▏╔═╗┃▒▓▒▒▓▓▒▓┃                  ┃┃░░┃┃███┃╔═╗ ▏\n";
                            std::cout << "▏╚═╝┃▒▒╱╲╱╲╱╲┃                  ┃┃░░┃┃███┃╚═╝ ▏\n";
                            std::cout << "▏   ┃▒▒▒▒▒▒▒┃┃                  ┃┃░░┃┃███┃    ▏\n";
                            std::cout << "▏   ┃▒▓▒┃╰━━╯┃                  ┃╰━━╯┃███┃    ▏\n";
                            std::cout << "▏   ┃▓▓▓┃    ┃                  ┃    ┃███┃    ▏\n";
                            std::cout << "▏   ┃███┃    ┃                  ┃    ┃███┃    ▏\n";
                            std::cout << "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▏\n";
                            power = power - 2; // sistema de energia
                        }
                        else {
                            system("clear");
                            std::cout << "______________________________________________\n";
                            std::cout << "▏   ┃╲  ╲                            ╱  ╱┃    ▏\n";
                            std::cout << "▏   ┃█╲  ╲                          ╱  ╱█┃    ▏\n";
                            std::cout << "▏   ┃██╲  ╲                        ╱  ╱██┃    ▏\n";
                            std::cout << "▏   ┃███╲  ╲                      ╱  ╱███┃    ▏\n";
                            std::cout << "▏╔═╗┃███┃   ╲                    ╱   ┃███┃╔═╗ ▏\n";
                            std::cout << "▏╚═╝┃███┃╭━━╮┃▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔┃╭━━╮┃███┃╚═╝ ▏\n";
                            std::cout << "▏╔═╗┃███┃┃░░┃┃                  ┃┃░░┃┃███┃╔═╗ ▏ \n";
                            std::cout << "▏╚═╝┃███┃┃░░┃┃                  ┃┃░░┃┃███┃╚═╝ ▏\n";
                            std::cout << "▏   ┃███┃┃░░┃┃                  ┃┃░░┃┃███┃    ▏\n";
                            std::cout << "▏   ┃███┃╰━━╯┃                  ┃╰━━╯┃███┃    ▏\n";
                            std::cout << "▏   ┃███┃    ┃                  ┃    ┃███┃    ▏\n";
                            std::cout << "▏   ┃███┃    ┃                  ┃    ┃███┃    ▏\n";
                            std::cout << "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▏\n";
                            power = power - 2; // sistema de energia
                        }
                    }
                    else if (doorrigth == 1){ // e porta rigth tiver fechada
                        if (bonnieyou == true){ // e o bonnieyou (bonnie e você) tiver verdadeiro
                            system("clear");
                            std::cout << "______________________________________________\n";
                            std::cout << "▏   ┃╲  ╲                            ╱  ╱┃    ▏\n";
                            std::cout << "▏   ┃█╲ ▒╲  ▒                       ╱  ╱ ┃    ▏\n";
                            std::cout << "▏   ┃██▓▒ ╲▓▒                      ╱  ╱  ┃    ▏\n";
                            std::cout << "▏   ┃██▓▒  ▓▒                     ╱  ╱   ┃    ▏\n";
                            std::cout << "▏╔═╗┃██▒▒▒▒▒▒                    ╱   ┃   ┃    ▏\n";
                            std::cout << "▏╚═╝┃█▒▒█▒▒█▒▒▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔┃╭━━╮┃   ┃██  ▏\n";
                            std::cout << "▏╔═╗┃▒▓▒▒▓▓▒▓┃                  ┃┃░░┃┃   ┃╔═╗ ▏ \n";
                            std::cout << "▏╚═╝┃▒▒╱╲╱╲╱╲┃                  ┃┃░░┃┃╲ ╱┃╚═╝ ▏\n";
                            std::cout << "▏   ┃▒▒▒▒▒▒▒┃┃                  ┃┃░░┃┃   ┃    ▏\n";
                            std::cout << "▏   ┃▒▓▒┃╰━━╯┃                  ┃╰━━╯┃   ┃    ▏\n";
                            std::cout << "▏   ┃▓▓▓┃    ┃                  ┃    ┃   ┃    ▏\n";
                            std::cout << "▏   ┃███┃    ┃                  ┃    ┃   ┃    ▏\n";
                            std::cout << "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▏\n";
                            power = power - 2; // sistema de energia
                        }
                        else {
                            system("clear");
                            std::cout << "______________________________________________\n";
                            std::cout << "▏   ┃╲  ╲                            ╱  ╱┃    ▏\n";
                            std::cout << "▏   ┃█╲  ╲                          ╱  ╱ ┃    ▏\n";
                            std::cout << "▏   ┃██╲  ╲                        ╱  ╱  ┃    ▏\n";
                            std::cout << "▏   ┃███╲  ╲                      ╱  ╱   ┃    ▏\n";
                            std::cout << "▏╔═╗┃███┃   ╲                    ╱   ┃   ┃    ▏\n";
                            std::cout << "▏╚═╝┃███┃╭━━╮┃▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔┃╭━━╮┃   ┃██  ▏\n";
                            std::cout << "▏╔═╗┃███┃┃░░┃┃                  ┃┃░░┃┃   ┃╔═╗ ▏\n";
                            std::cout << "▏╚═╝┃███┃┃░░┃┃                  ┃┃░░┃┃╲ ╱┃╚═╝ ▏\n";
                            std::cout << "▏   ┃███┃┃░░┃┃                  ┃┃░░┃┃   ┃    ▏\n";
                            std::cout << "▏   ┃███┃╰━━╯┃                  ┃╰━━╯┃   ┃    ▏\n";
                            std::cout << "▏   ┃███┃    ┃                  ┃    ┃   ┃    ▏\n";
                            std::cout << "▏   ┃███┃    ┃                  ┃    ┃   ┃    ▏\n";
                            std::cout << "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▏\n";
                            power = power - 4; // sistema de energia
                        }
                    }
                }
                else if (doorleft == 1){ // se porta left tiver fechada
                    if (doorrigth == 0){ // e porta rigth aberta
                        if (bonnieyou == true){
                            system("clear");
                            std::cout << "______________________________________________\n";
                            std::cout << "▏   ┃╲  ╲                            ╱  ╱┃    ▏\n";
                            std::cout << "▏   ┃ ╲  ╲                          ╱  ╱█┃    ▏\n";
                            std::cout << "▏   ┃  ╲  ╲                        ╱  ╱██┃    ▏\n";
                            std::cout << "▏   ┃   ╲  ╲                      ╱  ╱███┃    ▏\n";
                            std::cout << "▏   ┃   ┃   ╲                    ╱   ┃███┃╔═╗ ▏\n";
                            std::cout << "▏ ██┃   ┃╭━━╮┃▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔┃╭━━╮┃███┃╚═╝ ▏\n";
                            std::cout << "▏╔═╗┃   ┃┃░▒┃┃                  ┃┃░░┃┃███┃╔═╗ ▏\n";
                            std::cout << "▏╚═╝┃╲ ╱┃┃▒▒┃┃                  ┃┃░░┃┃███┃╚═╝ ▏\n";
                            std::cout << "▏   ┃   ┃┃▒▒┃┃                  ┃┃░░┃┃███┃    ▏\n";
                            std::cout << "▏   ┃   ┃╰━━╯┃                  ┃╰━━╯┃███┃    ▏\n";
                            std::cout << "▏   ┃   ┃    ┃                  ┃    ┃███┃    ▏\n";
                            std::cout << "▏   ┃   ┃    ┃                  ┃    ┃███┃    ▏\n";
                            std::cout << "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▏\n";
                            power = power - 4; //sistema de enegia
                        }
                        else {
                            system("clear");
                            std::cout << "______________________________________________\n";
                            std::cout << "▏   ┃╲  ╲                            ╱  ╱┃    ▏\n";
                            std::cout << "▏   ┃ ╲  ╲                          ╱  ╱█┃    ▏\n";
                            std::cout << "▏   ┃  ╲  ╲                        ╱  ╱██┃    ▏\n";
                            std::cout << "▏   ┃   ╲  ╲                      ╱  ╱███┃    ▏\n";
                            std::cout << "▏   ┃   ┃   ╲                    ╱   ┃███┃╔═╗ ▏\n";
                            std::cout << "▏ ██┃   ┃╭━━╮┃▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔┃╭━━╮┃███┃╚═╝ ▏\n";
                            std::cout << "▏╔═╗┃   ┃┃░░┃┃                  ┃┃░░┃┃███┃╔═╗ ▏\n";
                            std::cout << "▏╚═╝┃╲ ╱┃┃░░┃┃                  ┃┃░░┃┃███┃╚═╝ ▏\n";
                            std::cout << "▏   ┃   ┃┃░░┃┃                  ┃┃░░┃┃███┃    ▏\n";
                            std::cout << "▏   ┃   ┃╰━━╯┃                  ┃╰━━╯┃███┃    ▏\n";
                            std::cout << "▏   ┃   ┃    ┃                  ┃    ┃███┃    ▏\n";
                            std::cout << "▏   ┃   ┃    ┃                  ┃    ┃███┃    ▏\n";
                            std::cout << "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▏\n";
                            power = power - 4; //sistema de enegia
                        }
                    }
                    else if (doorrigth == 1){ // e porta rigth fechada
                        if (bonnieyou == true){
                            system("clear");
                            std::cout << "______________________________________________\n";
                            std::cout << "▏   ┃╲  ╲                            ╱  ╱┃    ▏\n";
                            std::cout << "▏   ┃ ╲  ╲                          ╱  ╱ ┃    ▏\n";
                            std::cout << "▏   ┃  ╲  ╲                        ╱  ╱  ┃    ▏\n";
                            std::cout << "▏   ┃   ╲  ╲                      ╱  ╱   ┃    ▏\n";
                            std::cout << "▏   ┃   ┃   ╲                    ╱   ┃   ┃    ▏\n";
                            std::cout << "▏ ██┃   ┃╭━━╮┃▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔┃╭━━╮┃   ┃██  ▏\n";
                            std::cout << "▏╔═╗┃   ┃┃░▒┃┃                  ┃┃░░┃┃   ┃╔═╗ ▏\n";
                            std::cout << "▏╚═╝┃╲ ╱┃┃▒▒┃┃                  ┃┃░░┃┃╲ ╱┃╚═╝ ▏\n";
                            std::cout << "▏   ┃   ┃┃▒▒┃┃                  ┃┃░░┃┃   ┃    ▏\n";
                            std::cout << "▏   ┃   ┃╰━━╯┃                  ┃╰━━╯┃   ┃    ▏\n";
                            std::cout << "▏   ┃   ┃    ┃                  ┃    ┃   ┃    ▏\n";
                            std::cout << "▏   ┃   ┃    ┃                  ┃    ┃   ┃    ▏\n";
                            std::cout << "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▏\n";
                            power = power - 12; // sitema de energia
                        }
                        else {
                            system("clear");
                            std::cout << "______________________________________________\n";
                            std::cout << "▏   ┃╲  ╲                            ╱  ╱┃    ▏\n";
                            std::cout << "▏   ┃ ╲  ╲                          ╱  ╱ ┃    ▏\n";
                            std::cout << "▏   ┃  ╲  ╲                        ╱  ╱  ┃    ▏\n";
                            std::cout << "▏   ┃   ╲  ╲                      ╱  ╱   ┃    ▏\n";
                            std::cout << "▏   ┃   ┃   ╲                    ╱   ┃   ┃    ▏\n";
                            std::cout << "▏ ██┃   ┃╭━━╮┃▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔┃╭━━╮┃   ┃██  ▏\n";
                            std::cout << "▏╔═╗┃   ┃┃░░┃┃                  ┃┃░░┃┃   ┃╔═╗ ▏\n";
                            std::cout << "▏╚═╝┃╲ ╱┃┃░░┃┃                  ┃┃░░┃┃╲ ╱┃╚═╝ ▏\n";
                            std::cout << "▏   ┃   ┃┃░░┃┃                  ┃┃░░┃┃   ┃    ▏\n";
                            std::cout << "▏   ┃   ┃╰━━╯┃                  ┃╰━━╯┃   ┃    ▏\n";
                            std::cout << "▏   ┃   ┃    ┃                  ┃    ┃   ┃    ▏\n";
                            std::cout << "▏   ┃   ┃    ┃                  ┃    ┃   ┃    ▏\n";
                            std::cout << "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▏\n";
                            power = power - 12; // sitema de energia
                        }
                    }
                // sistema de derrota provisorio
                if (power < 1){
                    break;
                }
                }
                std::cout << "Energia: " << power << "\n";
                std::cout << "Hora: " << tempo << "AM" << "\n";
                std::cout << "[1] portas [2] cameras [3] luzes [4] esperar: "; // escolha do menu
                std::cin >> menu; // atribuir escolha
                if (menu == 1){ // portas
                    std::cout << "[1] fechar [2] abrir: ";
                    std::cin >> menuportas;
                    if (menuportas == 1){
                        int LeftorRigth = 0;
                        std::cout << "[1] esquerda [2] direta: ";
                        std::cin >> LeftorRigth;
                        if (LeftorRigth == 1){
                            doorleft = 1;
                        }
                        if (LeftorRigth == 2){
                            doorrigth = 1;
                        }
                    }
                    else if (menuportas == 2){
                        int LeftorRigth = 0;
                        std::cout << "[1] esquerda [2] direta: ";
                        std::cin >> LeftorRigth;
                        if (LeftorRigth == 1){
                            doorleft = 0;
                        }
                        if (LeftorRigth == 2){
                            doorrigth = 0;
                        }
                    }
                }
                else if (menu == 2){ // camera
                    
                }
                else if (menu == 3){ // luzes
                    std::cout << "[1] ligar [2] desligar: ";
                    std::cin >> menuportas;
                    if (menuportas == 1){
                        int LeftorRigth = 0;
                        std::cout << "[1] esquerda [2] direta: ";
                        std::cin >> LeftorRigth;
                        if (LeftorRigth == 1){
                            doorleft = 1;
                        }
                        if (LeftorRigth == 2){
                            doorrigth = 1;
                        }
                    }
                    else if (menuportas == 2){
                        int LeftorRigth = 0;
                        std::cout << "[1] esquerda [2] direta: ";
                        std::cin >> LeftorRigth;
                        if (LeftorRigth == 1){
                            doorleft = 0;
                        }
                        if (LeftorRigth == 2){
                            doorrigth = 0;
                        }
                    }
                    
                }
                // jump scar sistem
                if (bonnieyou == true)
                {
                if (doorleft == 0){
                    srand(time(0));
                    int x = 8;
                    bonniejump = rand()%11;
                    if (bonniejump <= x){
                        for (int i = 0; i < 80; i++)
                        {
                            system("clear");
                            std::cout << "______________________________________________\n";
                            std::cout << "████████████ ▒▒▒ ███████████████ ▒▒▒ █████████▏\n";
                            std::cout << "████████████ ▒▒▒ ███████████████ ▒▒▒ █████████▏\n";
                            std::cout << "████████████ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ █████████▏\n";
                            std::cout << "████████████ ▒████▒▒▒▒▒▒▒▒▒▒▒▒████▒▒ █████████▏\n";
                            std::cout << "████████████ ▒█▓▓█▒▒▒▒▒▒▒▒▒▒▒▒█▓▓█▒▒ █████████▏\n";
                            std::cout << "████████████ ▒████▒▒▒▒▒▒▒▒▒▒▒▒████▒▒ █████████▏\n";
                            std::cout << "██████████ ▓▓▒▒▒▒▒▒▒▒▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓ ███████▏\n";
                            std::cout << "█████████ ▓▓▓▓▒▒▒▒▒▒▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▓▓▓▓ ██████▏\n";
                            std::cout << "██████████ ▓▓▒▒▒▒▒▒▒▒▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓ ███████▏\n";
                            std::cout << "███████████ ┃╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱┃ ███████▏\n";
                            std::cout << "███████████ ┃                        ┃ ███████▏\n";
                            std::cout << "███████████ ┃                        ┃ ███████▏\n";
                            std::cout << "████████████ ▒▒╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲▒▒ ███████▏\n";
                            std::cout << "████████████  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  ███████▏\n";
                            std::cout << "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n";
                        }
                        for (int i; i < 100; i++){
                            system("clear");
                            std::cout << "______________________________________________\n";
                            std::cout << "████████████ ▒▒▒ ███████████████ ▒▒▒ █████████▏\n";
                            std::cout << "████████████ ▒▒▒ ███████████████ ▒▒▒ █████████▏\n";
                            std::cout << "████████████ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ █████████▏\n";
                            std::cout << "████████████ ▒████▒▒▒▒▒▒▒▒▒▒▒▒████▒▒ █████████▏\n";
                            std::cout << "████████████ ▒█▓▓█▒▒▒▒▒▒▒▒▒▒▒▒█▓▓█▒▒ █████████▏\n";
                            std::cout << "████████████ ▒████▒▒▒▒▒▒▒▒▒▒▒▒████▒▒ █████████▏\n";
                            std::cout << "██████████ ▓▓▒▒▒▒▒▒▒▒▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓ ███████▏\n";
                            std::cout << "█████████ ▓▓▓▓▒▒▒▒▒▒▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▓▓▓▓ ██████▏\n";
                            std::cout << "██████████ ▓▓▒▒▒▒▒▒▒▒▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓ ███████▏\n";
                            std::cout << "███████████ ┃╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱┃ ███████▏\n";
                            std::cout << "███████████ ┃                        ┃ ███████▏\n";
                            std::cout << "████████████ ▒▒╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲▒▒ ███████▏\n";
                            std::cout << "████████████  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  ███████▏\n";
                            std::cout << "██████████████████████████████████████████████▏\n";
                            std::cout << "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n"; 

                        }
                        for (int i = 0; i < 100; i++)
                        {
                            system("clear");
                            std::cout << "______________________________________________\n";
                            std::cout << "████████████ ▒▒▒ ███████████████ ▒▒▒ █████████▏\n";
                            std::cout << "████████████ ▒▒▒ ███████████████ ▒▒▒ █████████▏\n";
                            std::cout << "████████████ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ █████████▏\n";
                            std::cout << "████████████ ▒████▒▒▒▒▒▒▒▒▒▒▒▒████▒▒ █████████▏\n";
                            std::cout << "████████████ ▒█▓▓█▒▒▒▒▒▒▒▒▒▒▒▒█▓▓█▒▒ █████████▏\n";
                            std::cout << "████████████ ▒████▒▒▒▒▒▒▒▒▒▒▒▒████▒▒ █████████▏\n";
                            std::cout << "██████████ ▓▓▒▒▒▒▒▒▒▒▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓ ███████▏\n";
                            std::cout << "█████████ ▓▓▓▓▒▒▒▒▒▒▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▓▓▓▓ ██████▏\n";
                            std::cout << "██████████ ▓▓▒▒▒▒▒▒▒▒▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓ ███████▏\n";
                            std::cout << "███████████ ┃╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱┃ ███████▏\n";
                            std::cout << "███████████ ┃                        ┃ ███████▏\n";
                            std::cout << "███████████ ┃                        ┃ ███████▏\n";
                            std::cout << "████████████ ▒▒╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲▒▒ ███████▏\n";
                            std::cout << "████████████  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  ███████▏\n";
                            std::cout << "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n";
                        }
                        for (int i; i < 100; i++){
                            system("clear");
                            std::cout << "______________________________________________\n";
                            std::cout << "████████████ ▒▒▒ ███████████████ ▒▒▒ █████████▏\n";
                            std::cout << "████████████ ▒▒▒ ███████████████ ▒▒▒ █████████▏\n";
                            std::cout << "████████████ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ █████████▏\n";
                            std::cout << "████████████ ▒████▒▒▒▒▒▒▒▒▒▒▒▒████▒▒ █████████▏\n";
                            std::cout << "████████████ ▒█▓▓█▒▒▒▒▒▒▒▒▒▒▒▒█▓▓█▒▒ █████████▏\n";
                            std::cout << "████████████ ▒████▒▒▒▒▒▒▒▒▒▒▒▒████▒▒ █████████▏\n";
                            std::cout << "██████████ ▓▓▒▒▒▒▒▒▒▒▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓ ███████▏\n";
                            std::cout << "█████████ ▓▓▓▓▒▒▒▒▒▒▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▓▓▓▓ ██████▏\n";
                            std::cout << "██████████ ▓▓▒▒▒▒▒▒▒▒▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓ ███████▏\n";
                            std::cout << "███████████ ┃╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱┃ ███████▏\n";
                            std::cout << "███████████ ┃                        ┃ ███████▏\n";
                            std::cout << "████████████ ▒▒╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲▒▒ ███████▏\n";
                            std::cout << "████████████  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  ███████▏\n";
                            std::cout << "██████████████████████████████████████████████▏\n";
                            std::cout << "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n"; 

                        }
                        game = false;
                        break;
                    }
                }
                else if (doorleft == 1)
                {
                    srand(time(0));
                    int x = 5;
                    bonnieexit = rand()%10;
                    if (bonnieexit < x){
                        localbonnie = 2;
                        bonnieyou = false;
                    }
                }
                
                }
            }
            
            
        }
        else if (play == 2)
        {
            break;
        }
        else {
            std::cout << "saindo...";
            break;
        }
        
    }

    return 0;
}