const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Kvadrato dydis
const gridSizeX = 13;
const gridSizeY = 9;
const squareSize = 100;

let bombs = [];
console.log(bombs);
console.log();

import { bombExplode } from './bombExplosion.js';

// Sukuriame bombos paveikslėlį
let bombImage = new Image();
bombImage.src = 'images/bomb.png';

let bombExploded = new Image();
bombExploded.src = 'images/explosion.png';

// Kai paveikslėlis užkrautas, patvirtinimas (neprivaloma)
bombImage.onload = function() {
    console.log("Bomb image loaded!");
};
bombExploded.onload = function() {


}

// funkicija sukuriant position.x === 100 && position.y === 100 red block

// const fixedBlock = [{ x: 100, y: 100 }, { x: 300, y: 100 }, { x: 500, y: 100 }, { x: 700, y: 100 }, { x: 900, y: 100 }, { x: 1100, y: 100 }, { x: 100, y: 300 }, { x: 100, y: 500 }, { x: 100, y: 700 }, { x: 100, y: 900 }, { x: 100, y: 1100 }, { x: 300, y: 1100 }, { x: 500, y: 1100 }, { x: 700, y: 1100 }, { x: 900, y: 1100 }, { x: 1100, y: 1100 }, { x: 1100, y: 300 }, { x: 1100, y: 500 }, { x: 1100, y: 700 }, { x: 1100, y: 900 }, { x: 300, y: 300 }, { x: 300, y: 500 }, { x: 300, y: 700 }, { x: 300, y: 900 }, { x: 500, y: 300 }, { x: 500, y: 500 }, { x: 500, y: 700 }, { x: 500, y: 900 }, { x: 700, y: 300 }, { x: 700, y: 500 }, { x: 700, y: 700 }, { x: 700, y: 900 }, { x: 900, y: 300 }, { x: 900, y: 500 }, { x: 900, y: 700 }]

// function drawFixBlock() {

//     for (let i = 0; i < fixedBlock.length; i++) {
//         ctx.fillStyle = 'grey';
//         ctx.fillRect(fixedBlock[i].x, fixedBlock[i].y, 100, 100)
//     }

// }
// drawFixBlock()

// Funkcija padėti bombą
function setBomb() {
    bombs.push({ x: playerX, y: playerY });
    setTimeout(() => bombExplode(bombs, walls, playerX, playerY, updateCanvas), 3000)


    updateCanvas();

}

// Funkcija, kuri ištrina bombą ir prideda sprogimą

// function bombExplode(bomb) {
//     if (setBomb) {
//         // Set the bomb image to explosion
//         bombImage.src = 'images/explosion.png';

//         setTimeout(() => {
//             // Loop through walls to check if there is a wall within explosion range
//             for (let i = 0; i < walls.length; i++) {
//                 if (
//                     (bombs[0].x + 100 === walls[i].x && bombs[0].y === walls[i].y) || // Right
//                     (bombs[0].x - 100 === walls[i].x && bombs[0].y === walls[i].y) || // Left
//                     (bombs[0].x === walls[i].x && bombs[0].y + 100 === walls[i].y) || // Down
//                     (bombs[0].x === walls[i].x && bombs[0].y - 100 === walls[i].y) // Up
//                 ) {
//                     // Remove the wall from the walls array
//                     walls.splice(i, 1);
//                     console.log('Wall removed:', walls);
//                     break; // Stop after removing one wall to avoid index issues
//                 }
//             }

//             // Check if player is at bomb position
//             if (playerX === bombs[0].x && playerY === bombs[0].y) {
//                 alert('Game over');
//             }

//             // Remove the bomb from the bombs array
//             bombs.pop();

//             // Reset the bomb image to the original
//             bombImage.src = 'images/bomb.png';

//             // Update the canvas to reflect all changes
//             updateCanvas();
//         }, 1000); // Delay for explosion effect
//     }
// }

// bombExplode()

// Piešiame visas bombas
function drawBombs() {
    for (let i = 0; i < bombs.length; i++) {
        ctx.drawImage(bombImage, bombs[i].x, bombs[i].y, 100, 100);
    }
}

// SVG bomberman paveikslėlio įkėlimas
const img = new Image();
img.src = 'images/bomberman.png';

// Kai paveikslėlis įkeltas, piešiame jį
img.onload = function() {
    ctx.drawImage(img, 0, 0, 100, 100);
};

// Nustatome kontūro spalvą (raudona) ir linijos storį


// Playerio padėtis ir dydis
let playerX = 0;
let playerY = 0;
let playerSize = 100; // Žaidėjas užima vieną kvadratą

console.log(playerX, playerY);

let walls = []; // Masyvas sienoms
let move = 50; // Kiekvieno judesio dydis yra 50 pikselių
// console.log(walls.x[i], walls.y[i]);

// Pagrindinis grid'o piešimas
function drawGrid() {
    ctx.strokeStyle = 'white'; // Baltos linijos tarp kvadratų
    ctx.lineWidth = 2; // Storesnė linija, jei reikia

    for (let row = 0; row < gridSizeY; row++) {
        for (let col = 0; col < gridSizeX; col++) {
            ctx.fillStyle = 'yellow'; // Geltonas kvadrato fonas
            ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
            ctx.strokeRect(col * squareSize, row * squareSize, squareSize, squareSize);
        }
    }

}


// Funkcija piešti žaidėją
function drawPlayer() {
    ctx.drawImage(img, playerX, playerY, playerSize, playerSize);
}

// Funkcija piešti sienas su juoda spalva

let wallImage = new Image();
wallImage.onload = function() {
    updateCanvas()
}
wallImage.src = 'images/background-made-from-bricks.jpg';

function drawWalls() {
    for (let i = 0; i < walls.length; i++) {
        // console.log(walls[i].x, walls[i].y);
        ctx.drawImage(wallImage, walls[i].x, walls[i].y, 100, 100)

    }



    // ctx.fillStyle = 'black'; // Nustatome juodą spalvą sienoms
    // for (let i = 0; i < walls.length; i++) {
    //     ctx.fillRect(walls[i].x, walls[i].y, squareSize, squareSize); // Piešiame kiekvieną sieną
    // }
}

// Funkcija atnaujinti Canvas (piešia grid, sienas, bombas ir žaidėją)
function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Išvalo Canvas
    drawGrid(); // Pirma piešiame grid'ą (mėlyni kvadratai)
    // checkFixedBlock()
    drawWalls(); // Piešiame sienas (juoda spalva)
    // drawFixBlock()
    checkBorders(); // Tikriname žaidėjo poziciją
    drawBombs(); // Piešiame visas bombas
    drawPlayer(); // Galiausiai piešiame žaidėją
}
// new function cant walk through grey blocks
// function checkFixedBlock() {
//     for (let i = 0; i < fixedBlock.length; i++) {
//         if (playerX === fixedBlock[i].x && playerY === fixedBlock[i].y) {
//             return true
//         }
//     }
//     return false
// }
// checkFixedBlock()

// Generuoja sienas atsitiktinėse vietose
function generateWalls() {

    for (let i = 0; i < 80; i++) {
        let randomX = Math.floor(Math.random() * gridSizeX) * squareSize;
        let randomY = Math.floor(Math.random() * gridSizeY) * squareSize;


        if (randomX === 0 && randomY === 0 || randomX === 100 && randomY === 0 || randomX === 0 && randomY === 100 || randomX === 100 && randomY === 100) {
            continue

        }

        walls.push({ x: randomX, y: randomY });
    }

}

// Funkcija tikrina, ar judėjimas atsitrenks į sieną
function checkCollision(newX, newY) {
    for (let i = 0; i < walls.length; i++) {
        let wallX = walls[i].x;
        let wallY = walls[i].y;

        // Tikriname, ar žaidėjas kerta sienos kvadratą iš bet kurios pusės
        if (
            newX < wallX + squareSize && // Žaidėjo kairysis kraštas mažesnis nei sienos dešinysis kraštas
            newX + playerSize > wallX && // Žaidėjo dešinysis kraštas didesnis nei sienos kairysis kraštas
            newY < wallY + squareSize && // Žaidėjo viršutinis kraštas mažesnis nei sienos apatinis kraštas
            newY + playerSize > wallY // Žaidėjo apatinis kraštas didesnis nei sienos viršutinis kraštas
        ) {
            return true; // Susidūrimas aptiktas
        }
    }
    return false; // Jei susidūrimo nėra
}

// Funkcija, neleidžianti išeiti už canvas ribų
function checkBorders() {
    if (playerX < 0) {
        playerX = 0;
    }
    if (playerY < 0) {
        playerY = 0;
    }
    if (playerX > canvas.width - playerSize) {
        playerX = canvas.width - playerSize;
    }
    if (playerY > canvas.height - playerSize) {
        playerY = canvas.height - playerSize;
    }
}

// Žaidėjo judėjimo funkcija
function movement(event) {
    let isAlignedX = playerX % squareSize === 0;
    let isAlignedY = playerY % squareSize === 0;

    const key = event.key;
    let newX = playerX;
    let newY = playerY;

    // Judėjimas į kairę
    if (key === 'ArrowLeft' && isAlignedY) {
        newX -= move;
        if (!checkCollision(newX, playerY)) {
            playerX = newX;
        }
    }

    // Judėjimas į viršų
    if (key === 'ArrowUp' && isAlignedX) {
        newY -= move;
        if (!checkCollision(playerX, newY)) {
            playerY = newY;
        }
    }

    // Judėjimas į dešinę
    if (key === 'ArrowRight' && isAlignedY) {
        newX += move;
        if (!checkCollision(newX, playerY)) {
            playerX = newX;
        }
    }

    // Judėjimas į apačią
    if (key === 'ArrowDown' && isAlignedX) {
        newY += move;
        if (!checkCollision(playerX, newY)) {
            playerY = newY;
        }
    }

    // Bombos padėjimas
    if (key === 'b') {
        if (bombs.length > 0) {
            return;
        }


        // console.log(`Bomb set at X: ${playerX}, Y: ${playerY}`);

        // bombs.push({ x: playerX, y: playerY });
        // console.log(bombs);
        setBomb();
        return;
    }
    console.log(`Player position:X: ${playerX}, Y:${playerY}`);
    updateCanvas(); // Atnaujiname Canvas po kiekvieno judėjimo
}

// Inicializacija
generateWalls(); // Sugeneruojame atsitiktines sienas
updateCanvas(); // Pradžioje atvaizduojame grid'ą, sienas ir žaidėją

// Klaviatūros paspaudimų klausytojas
window.addEventListener('keydown', movement);