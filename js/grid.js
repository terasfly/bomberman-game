export function drawGrid(ctx, gridSizeX, gridSizeY, squareSize) {
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