"use strict";

//Para recuperar os elementos usar as posições de 0 a 9
// matriz para controlar o que já foi destruído
// 0 para célula intácta
// 1 para barco
// 2 para tiro na água
// 3 tiro em um barco

const container = document.getElementById("container");
container.style.pointerEvents = "none";
let campo = [
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
];
let hits = 0;
for(let count = 0; count < 10; count++){
    for(let count2 = 0; count2 < 10; count2++){
        let element = document.createElement("div");
        element.setAttribute("class", "fieldCell");
        element.setAttribute("id", "cell"+count+count2);
        element.addEventListener("click", shot);
        element.setAttribute("data-line", count.toString());
        element.setAttribute("data-column", count2.toString());
        container.appendChild(element);
    }
}

function startGame(event){
    container.style.pointerEvents = "auto";
    event.target.style.display = "none";
}

function shot(event) {

    switch(campo[event.target.dataset.line][event.target.dataset.column]){

        case 0:
            event.target.setAttribute("class", "shotWater");
            event.target.innerHTML = "O";
            campo[event.target.dataset.line][event.target.dataset.column] = 2;
            break;

        case 1:
            event.target.setAttribute("class", "shotBoat");
            event.target.innerHTML = "X";
            campo[event.target.dataset.line][event.target.dataset.column] = 3;
            hits++;
            break;

        default:
            window.alert("Pare de desperdiçar torpedos soldado");
    }

    if (hits === 2){
        window.alert("Você venceu");
        container.style.pointerEvents = "none";
    }
}