// src/usecases/gameState.ts
import { PieceColor } from '../domain/enums';
import { Board } from '../domain/board';
import { database } from '../infrasturcture/database';

export class GameState {
    private currentTurn: PieceColor;
    private board: Board;
    private gameId: string;

    constructor(board: Board, gameId: string) {
        this.currentTurn = PieceColor.White;
        this.board = board;
        this.gameId = gameId;
    }

    // Get current turn
    getCurrentTurn(): PieceColor {
        return this.currentTurn;
    }

    // Toggle turns
    toggleTurn(): void {
        this.currentTurn = this.currentTurn === PieceColor.White ? PieceColor.Black : PieceColor.White;
    }

    // Check if the current turn matches the given color
    isCorrectTurn(pieceColor: PieceColor): boolean {
        return pieceColor === this.currentTurn;
    }

    // Check if the player of a given color is in check
    isInCheck(color: PieceColor): boolean {
        // Placeholder: Implement actual check detection
        return false;
    }

    // Check if the player of a given color has valid moves
    hasValidMoves(color: PieceColor): boolean {
        // Placeholder: Implement actual move generation and validation
        return true;
    }

    // Check for checkmate
    isCheckmate(): boolean {
        return this.isInCheck(this.currentTurn) && !this.hasValidMoves(this.currentTurn);
    }

    // Check for stalemate
    isStalemate(): boolean {
        return !this.isInCheck(this.currentTurn) && !this.hasValidMoves(this.currentTurn);
    }

    // Fetch game state from database by gameId
    static getGameState(gameId: string): GameState {
        const game = database.games.get(gameId);
        if (!game) {
            throw new Error('Game not found');
        }

        const board = game.board; // Assuming 'game.board' contains the current board state
        const gameState = new GameState(board, gameId);
        gameState.currentTurn = game.currentTurn; // Set the current turn from the game state
        return gameState;
    }
}



