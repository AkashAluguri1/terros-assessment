import { PieceType, PieceColor } from './enums';
import { Position } from './utils';

export class Piece {
    constructor(public type: PieceType, public color: PieceColor) {}

    isValidMove(from: Position, to: Position, board: any): boolean {
        const rowDiff = to.row - from.row;
        const colDiff = to.col - from.col;

        switch (this.type) {
            case PieceType.Pawn:
                return this.isValidPawnMove(from, to, rowDiff, colDiff, board);
            case PieceType.Rook:
                return this.isValidRookMove(rowDiff, colDiff, board);
            case PieceType.Knight:
                return this.isValidKnightMove(rowDiff, colDiff);
            case PieceType.Bishop:
                return this.isValidBishopMove(rowDiff, colDiff, board);
            case PieceType.Queen:
                return this.isValidQueenMove(rowDiff, colDiff, board);
            case PieceType.King:
                return this.isValidKingMove(rowDiff, colDiff);
            default:
                return false;
        }
    }

    private isValidPawnMove(from: Position, to: Position, rowDiff: number, colDiff: number, board: any): boolean {
        const direction = this.color === PieceColor.White ? 1 : -1;
        // Simple pawn move: one step forward
        if (colDiff === 0 && rowDiff === direction && !board.getPieceAt(to)) {
            return true;
        }
        // Capture move: one step diagonally
        if (Math.abs(colDiff) === 1 && rowDiff === direction && board.getPieceAt(to)?.color !== this.color) {
            return true;
        }
        // TODO: Add two-step move and en passant
        return false;
    }

    private isValidRookMove(rowDiff: number, colDiff: number, board: any): boolean {
        if (rowDiff !== 0 && colDiff !== 0) return false;
        return board.isPathClear(rowDiff, colDiff, board);
    }

    private isValidKnightMove(rowDiff: number, colDiff: number): boolean {
        return (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) ||
               (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2);
    }

    private isValidBishopMove(rowDiff: number, colDiff: number, board: any): boolean {
        if (Math.abs(rowDiff) !== Math.abs(colDiff)) return false;
        return board.isPathClear(rowDiff, colDiff, board);
    }

    private isValidQueenMove(rowDiff: number, colDiff: number, board: any): boolean {
        if (rowDiff === 0 || colDiff === 0 || Math.abs(rowDiff) === Math.abs(colDiff)) {
            return board.isPathClear(rowDiff, colDiff, board);
        }
        return false;
    }

    private isValidKingMove(rowDiff: number, colDiff: number): boolean {
        return Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1;
    }
}


