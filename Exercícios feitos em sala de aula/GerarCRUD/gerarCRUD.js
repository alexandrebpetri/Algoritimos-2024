let codigoFonte="";
        function gerarModel() {
            let nomeClasse = document.getElementById("inputNomeClasse").value;
            let atributos = document.getElementById("inputAtributos").value;

            let vetAtributos = atributos.split(",");

            codigoFonte = "class " + nomeClasse + "{" + "\n";

            codigoFonte += "   constructor (" + atributos + ")" + "{\n";

            for (let i = 0; i < vetAtributos.length; i++) {
                const at = vetAtributos[i];
                codigoFonte += "          this." + at + " = " + at + ";\n";
            }
            codigoFonte+="          this.posicaoNaLista = null;\n"
            codigoFonte+="   }\n}\n";
            
            //console.log(codigoFonte);
            document.getElementById("taCodigoFonte").textContent = codigoFonte;
        }

        function gerarView(){
            codigoFonte = "você não achou que seria tão fácil...\n\nBasta programar para gerar o HTML como aprendeu em algoritmos no segundo e terceiro bimestres... "
            document.getElementById("taCodigoFonte").textContent = codigoFonte;
        }

        function gerarController(){
            codigoFonte = ".... basta programar para gerar o Controller como aprendeu em algoritmos no segundo e terceiro bimestres...\n ";
            codigoFonte += "dá trabalho (uma vez) mas depois fica muito mais fácil\n ";
            document.getElementById("taCodigoFonte").textContent = codigoFonte;
        }