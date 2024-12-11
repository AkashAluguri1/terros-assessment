import { Board } from '../domain/board';
import { GameState } from './gameState';
import { Position } from '../domain/utils';
import { PieceColor } from '../domain/enums';

export class MoveValidator {
    constructor(private board: Board, private gameState: GameState) {}

    validateMove(from: Position, to: Position): boolean {
        const piece = this.board.getPieceAt(from);
        if (!piece) throw new Error('No piece at the starting position.');
        if (!this.gameState.isCorrectTurn(piece.color)) throw new Error('It is not your turn.');

        const targetPiece = this.board.getPieceAt(to);
        if (targetPiece && targetPiece.color === piece.color) throw new Error('Cannot capture your own piece.');

        // Check if the move is valid for the piece type
        if (!piece.isValidMove(from, to, this.board)) throw new Error('Invalid move for the selected piece.');

        // TODO: validate for Check after every move
        return true;
    }
}


