const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Grid size and square dimensions
const gridSizeX = 13;
const gridSizeY = 9;
const squareSize = 100;

let bombs = [];
let walls = [];
let playerX = 0;
let playerY = 0;
let playerSize = 100;
let move = 50;

import { bombExplode } from './bombExplosion.js';
import { drawGrid } from './grid.js';

// Load bomb image
let bombImage = new Image();
bombImage.src = 'images/bomb.png';

// Load explosion image
let bombExploded = new Image();
bombExploded.src = 'images/explosion.png';

bombImage.onload = function() {
    console.log("Bomb image loaded!");
};

// Function to place a bomb at the player's current position
function setBomb() {
    bombs.push({ x: playerX, y: playerY, type: 'bomb' });
    updateCanvas();

    // After 2 seconds, trigger the bomb explosion
    setTimeout(() => bombExplode(bombs, walls, playerX, playerY, updateCanvas), 2000);
}

// Draws all bombs and explosions based on their current type
function drawBombs() {
    for (let i = 0; i < bombs.length; i++) {
        if (bombs[i].type === 'explosion') {
            ctx.drawImage(bombExploded, bombs[i].x, bombs[i].y, 100, 100);
        } else if (bombs[i].type === 'bomb') {
            ctx.drawImage(bombImage, bombs[i].x, bombs[i].y, 100, 100);
        }
    }
}

// Load and draw the player's image at the initial position
const img = new Image();
img.src = 'images/bomberman.png';

img.onload = function() {
    ctx.drawImage(img, 0, 0, 100, 100);
};

// Draws the player at the current position
function drawPlayer() {
    ctx.drawImage(img, playerX, playerY, playerSize, playerSize);
}

// Load wall image
let wallImage = new Image();
wallImage.src = 'images/background-made-from-bricks.jpg';

wallImage.onload = function() {
    updateCanvas();
};

// Draws all walls at their respective positions
function drawWalls() {
    for (let i = 0; i < walls.length; i++) {
        ctx.drawImage(wallImage, walls[i].x, walls[i].y, 100, 100);
    }
}

// Redraws the entire canvas, showing the grid, walls, bombs, and player
function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears the canvas
    drawGrid(ctx, gridSizeX, gridSizeY, squareSize); // Draws the grid
    drawWalls(); // Draws all walls
    checkBorders(); // Ensures player stays within borders
    drawBombs(); // Draws all bombs and explosions
    drawPlayer(); // Draws the player
}

// Checks if the player's movement will collide with any walls
function checkCollision(newX, newY) {
    for (let i = 0; i < walls.length; i++) {
        let wallX = walls[i].x;
        let wallY = walls[i].y;

        // Check if player's edges overlap with wall edges
        if (
            newX < wallX + squareSize &&
            newX + playerSize > wallX &&
            newY < wallY + squareSize &&
            newY + playerSize > wallY
        ) {
            return true; // Collision detected
        }
    }
    return false; // No collision
}

// Ensures the player doesn't move out of the canvas boundaries
function checkBorders() {
    if (playerX < 0) playerX = 0;
    if (playerY < 0) playerY = 0;
    if (playerX > canvas.width - playerSize) playerX = canvas.width - playerSize;
    if (playerY > canvas.height - playerSize) playerY = canvas.height - playerSize;
}

// Handles player movement and bomb placement based on key presses
function movement(event) {
    let isAlignedX = playerX % squareSize === 0;
    let isAlignedY = playerY % squareSize === 0;

    const key = event.key;
    let newX = playerX;
    let newY = playerY;

    // Move left
    if (key === 'ArrowLeft' && isAlignedY) {
        newX -= move;
        if (!checkCollision(newX, playerY)) playerX = newX;
    }

    // Move up
    if (key === 'ArrowUp' && isAlignedX) {
        newY -= move;
        if (!checkCollision(playerX, newY)) playerY = newY;
    }

    // Move right
    if (key === 'ArrowRight' && isAlignedY) {
        newX += move;
        if (!checkCollision(newX, playerY)) playerX = newX;
    }

    // Move down
    if (key === 'ArrowDown' && isAlignedX) {
        newY += move;
        if (!checkCollision(playerX, newY)) playerY = newY;
    }

    // Place bomb
    if (key === 'b') {
        if (bombs.length > 0) return; // Only one bomb at a time
        setBomb();
        return;
    }

    console.log(`Player position: X: ${playerX}, Y: ${playerY}`);
    updateCanvas(); // Update canvas after each movement
}

// Generates walls at random positions, avoiding the starting area
function generateWalls() {
    for (let i = 0; i < 80; i++) {
        let randomX = Math.floor(Math.random() * gridSizeX) * squareSize;
        let randomY = Math.floor(Math.random() * gridSizeY) * squareSize;

        // Skip positions near the start to keep player area clear
        if (
            (randomX === 0 && randomY === 0) ||
            (randomX === 100 && randomY === 0) ||
            (randomX === 0 && randomY === 100) ||
            (randomX === 100 && randomY === 100)
        ) {
            continue;
        }

        walls.push({ x: randomX, y: randomY });
    }
}

// Initialize walls and render initial canvas state
generateWalls();
updateCanvas();

// Keydown listener for player movement and bomb placement
window.addEventListener('keydown', movement);