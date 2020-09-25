/*les calculs se font sur la base de travail d'une pile inversée, la dernière
* valeur inseré est traité en premier (contrairement à une liste d'attente)
* les calculs se font sur la base des deux premières valeurs
* par exemple pile[3]=73 pile[2]=10 pile[1]=2 operateur=/
* on fait descendre la pile de deux elements et on reinsère le resultat
* ce qui donne pile[3]=null pile[2]=73 pile[1]=5
*/

// la pile des valeurs inserés dans la calculette (peut s'agrandir)
let pile = ['','','','',''];

function traiter (action , touche) {
    // recup des infos de traitements dans l'écran de saisie
    let saisie = document.querySelector('#saisie');

    // recup des infos de traitements dans les 4 piles
    let pile1 = document.querySelector('#pile1');
    let pile2 = document.querySelector('#pile2');
    let pile3 = document.querySelector('#pile3');
    let pile4 = document.querySelector('#pile4');

    // on verifie l'integrité entre l'affichage et les données de la pile
    if (pile[0]!=saisie.value || pile[1]!=pile1.value || pile[2]!=pile2.value || pile[3]!=pile3.value || pile[4]!=pile4.value){
        console.log("erreur d'integrité");
        pile[0] = 'erreur systeme';
        saisie.value = pile[0];
        return;
    }

    // et on traite les différentes action possible
    switch (action){
        case "chiffre": 
            console.log ('traitement chiffre', touche );
            // on ajoute le chiffre dans la saisie
            pile[0] += touche;
        break;

        case "operateur": 
            console.log ('traitement operateur' , touche );
            // traitement particulié de la touche enter
            // deux cas possible en cas de "enter" soit la saisie est validé...
            // soit on cherche à dupliquer la pile du bas
            if (touche == 'enter' && pile[0] == '') pile[0] = pile[1];
            // attention, si la saisie n'est pas vide, on l'insere dans la pile
            if (pile[0]!= '') pile.unshift('');

            // on s'assure qu'il y est bien quelque chose à faire
            // et que ceux qui ne savent pas utiliser une NPI ne fassent pas de dégats
            if (touche == '+' || touche == '-' || touche == '*' || touche == '/'){
                if (pile[2] == ''){
                    console.log("erreur de manipulation");
                    break;
                }
            }


            // a partir de là, la saisie est vide, on travaille que sur la pile
            // c'est plus simple comme ça, seulement un cas de figure possible
            switch (touche){
                case "+" :
                    pile[0] = parseInt(pile[2]) + parseInt(pile[1]);
                break;
                case "-" :
                    pile[0] = parseInt(pile[2]) - parseInt(pile[1]);
                break;
                case "*" :
                    pile[0] = parseInt(pile[2]) * parseInt(pile[1]);
                break;
                case "/" :
                    pile[0] = parseInt(pile[2]) / parseInt(pile[1]);
                break;
            }
            // et on remet de l'ordre dans la pile
            if (touche == '+' || touche == '-' || touche == '*' || touche == '/'){
                // on remonte le resultat dans la pile 2
                pile[2] = pile[0];
                // on fait descendre la pile
                pile.shift();
                // et on reinitialise la saisie
                pile[0] = '';
            }
            
        break;

        case "decimal": 
            console.log ('traitement decimal' , touche );
            // 2 problèmes avec les points, il doit y avoir quelque chose avant,
            if (saisie.value == '') pile[0] += '0';
            // et il ne doit n'y en avoir qu'une seule, rentre le point seulement si test negatif
            if (saisie.value.indexOf('.') == -1) pile[0] += '.';
        break;

        case "special": 
            console.log ('traitement special' , touche );
            switch (touche){
                case "del" :
                    // deux cas possible, soit on veut supprimer le contenu de la saisie
                    if (pile[0] != '') pile[0] = '';
                    // soit on veut supprime le premier contenu de la pile
                    if (pile[0] == '') {
                        pile.shift();
                        pile[0]='';
                    }
                    break;
                case "clear" :
                    // on efface tout!
                    for (let i = 0; i< pile.length; i++){
                        pile[i]='';
                    }
                    break;
            }
        break;
    }
    // et on resynchronise l'affichage avec les valeurs dans la pile
    saisie.value = pile[0];
    pile1.value = pile[1];
    pile2.value = pile[2];
    pile3.value = pile[3];
    pile4.value = pile[4];
}