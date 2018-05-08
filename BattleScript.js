"use strict";

//Para recuperar os elementos usar as posições de 0 a 9
// matriz para controlar o que já foi destruído
// 0 para célula intácta
// 1 para barco
// 2 para tiro na água
// 3 tiro em um barco

function cleanup(){
    container.innerHTML = '';
    cpu.innerHTML = '';

    hits = 0;
    cpuHits = 0;

    container.className = 'container';
    cpu.className = 'container';

    generateCpuBoats();

    for(let count = 0; count < 10; count++){
        for(let count2 = 0; count2 < 10; count2++){
            let element = document.createElement("div");
            element.setAttribute("class", "fieldCell");
            element.setAttribute("id", "cell"+count+count2);
            //element.addEventListener("click", setUserBoat);
            element.setAttribute("data-line", count.toString());
            element.setAttribute("data-column", count2.toString());
            container.appendChild(element);
        }
    }

    for(let count = 0; count < 10; count++){
        for(let count2 = 0; count2 < 10; count2++){
            let element = document.createElement("div");
            element.setAttribute("class", "fieldCellSelf");
            element.setAttribute("id", "cpu"+count+count2);
            element.addEventListener("click", setUserBoat);
            element.setAttribute("data-line", count.toString());
            element.setAttribute("data-column", count2.toString());
            cpu.appendChild(element);
        }

    }

    document.getElementById('start').style.display = 'block';
    document.getElementById('restart').style.display = 'none';
}

function generateCpuBoats(){
    for(let i = 0; i < 10; i++){
        cpuCampo[i] = [];
        for(let j = 0; j < 10; j++){
            cpuCampo[i][j] = randomBoat();
        }
    }

    if(cpuBoats !== 0) generateCpuBoats();
}

function randomBoat(){
    if(cpuBoats === 0) return 0;

    var rand = Math.random();

    if(rand > 0.5){
        cpuBoats--;
        return 1;
    }else return 0;
}

const container = document.getElementById("user");
const cpu = document.getElementById("computer");
const BOATS = 9;

container.style.pointerEvents = "none";

var campo = [], cpuCampo = [];
var hits, cpuHits;
var cpuBoats = 9, userBoats = 9;

cleanup();

function startGame(event){
    requestUserBoats();
    container.style.pointerEvents = "auto";
    event.target.style.display = "none";
}

function setUserBoat(e){
    var line = e.target.dataset.line;
    var column = e.target.dataset.column;
    var target = e.target;

    if(campo[line][column] === 0){
        userBoats--;
        campo[line][column] = 1;
        target.setAttribute('class', 'myBoat');
    }else{
        alert("Barcos não stackam!");
    }

    if(userBoats === 0)
        startGameplay();
}

function startGameplay(){
    let blocks = container.children;
    for(let i = 0; i < blocks.length; i++){
        blocks[i].addEventListener("click", shot);
        blocks[i].className = 'fieldCellSelf';
    }

    container.className ='container self';

    let cpuBlocks = cpu.children;
    for(let i = 0; i < cpuBlocks.length; i++){
        cpuBlocks[i].removeEventListener("click", setUserBoat);
        if(cpuBlocks[i].className !== 'myBoat') cpuBlocks[i].className = 'fieldCell';
    }

    cpu.className = 'container';

    alert("Que a batalha comece! Ataque o campo indicado!");
}

function requestUserBoats(){
    campo = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    cpu.className = 'container self';

    alert("Clique nos blocos do campo indicado para posicionar 9 barcos");
}

function shot(event) {
    play(campo, event);

    if (hits === BOATS){
        window.alert("Você venceu");
        container.style.pointerEvents = "none";
        document.getElementById('restart').style.display = 'block';
    }else if(cpuHits === BOATS){
        window.alert("Você perdeu");
        container.style.pointerEvents = "none";
        document.getElementById('restart').style.display = 'block';
    }
}

function cpuPlay(){
    var line = Math.floor(Math.random()*10);
    var column = Math.floor(Math.random()*10);

    var target = document.getElementById('cpu'+line+column);

    switch (campo[line][column]){
        case 0:
            target.setAttribute("class", "shotWater");
            target.innerHTML = "O";
            campo[line][column] = 2;
            break;
        case 1:
            target.setAttribute("class", "shotBoat");
            target.innerHTML = "X";
            campo[line][column] = 3;

            cpuHits++;
            break;
        default:
            cpuPlay();
            break;
    }
}

function play(campo, event) {
    var line = event.target.dataset.line;
    var column = event.target.dataset.column;
    var target = event.target;

    switch(cpuCampo[line][column]){
        case 0:
            target.setAttribute("class", "shotWaterSelf");
            target.innerHTML = "O";
            cpuCampo[line][column] = 2;
            cpuPlay();
            break;

        case 1:
            target.setAttribute("class", "shotBoatSelf");
            target.innerHTML = "X";
            cpuCampo[line][column] = 3;

            hits++;
            cpuPlay();
            break;

        default:
            window.alert("Pare de desperdiçar torpedos soldado");
    }
}