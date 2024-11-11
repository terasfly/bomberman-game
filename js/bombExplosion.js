// bombExplosion.js

// Exported function for bomb explosion logic
export function bombExplode(bombs, walls, playerX, playerY, updateCanvas) {
    if (bombs.length === 0) return; // Ensure there's a bomb to explode

    const bomb = bombs[0]; // Current bomb position
    const explosionRange = 100; // Define explosion range around the bomb

    setTimeout(() => {
        // Remove walls in explosion range around the bomb
        for (let i = walls.length - 1; i >= 0; i--) {
            const wall = walls[i];

            if (
                (wall.x === bomb.x + explosionRange && wall.y === bomb.y) || // Right
                (wall.x === bomb.x - explosionRange && wall.y === bomb.y) || // Left
                (wall.x === bomb.x && wall.y === bomb.y + explosionRange) || // Down
                (wall.x === bomb.x && wall.y === bomb.y - explosionRange) // Up
            ) {
                walls.splice(i, 1); // Remove wall within explosion range
            }
        }

        // Check if player is at bomb position
        if (playerX === bomb.x && playerY === bomb.y) {
            alert('Game over');
        }

        bombs.pop(); // Remove bomb from the bombs array
        updateCanvas(); // Update canvas to reflect changes
    }, 1000); // Delay for explosion effect
}