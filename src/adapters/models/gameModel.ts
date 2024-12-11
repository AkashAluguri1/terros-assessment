export interface Game {
    id: string;
    board: any[];
    currentPlayer: string;
    status: string;
}

export const createNewGame = (): Game => ({
    id: Math.random().toString(36).substr(2, 9), // Generates a random game ID
    board: [], // Initializes an empty board 
    currentPlayer: 'Player1',
    status: 'ongoing',
});



