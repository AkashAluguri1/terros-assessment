import { PieceColor } from '../domain/enums';
import { Board } from '../domain/board';

export class GameState {
    private currentTurn: PieceColor;
    private board: Board;

    constructor(board: Board) {
        this.currentTurn = PieceColor.White;
        this.board = board;
    }

    getCurrentTurn(): PieceColor {
        return this.currentTurn;
    }

    toggleTurn(): void {
        this.currentTurn = this.currentTurn === PieceColor.White ? PieceColor.Black : PieceColor.White;
    }

    isCorrectTurn(pieceColor: PieceColor): boolean {
        return pieceColor === this.currentTurn;
    }

    isInCheck(color: PieceColor): boolean {
        // TODO: Implement check detection
        return false;
    }

    hasValidMoves(color: PieceColor): boolean {
        // TODO: Implement move generation and validation
        return true;
    }

    isCheckmate(): boolean {
        return this.isInCheck(this.currentTurn) && !this.hasValidMoves(this.currentTurn);
    }

    isStalemate(): boolean {
        return !this.isInCheck(this.currentTurn) && !this.hasValidMoves(this.currentTurn);
    }
}


