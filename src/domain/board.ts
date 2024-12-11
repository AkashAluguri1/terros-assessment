import { Piece } from './piece';
import { PieceType, PieceColor } from './enums';
import { Position } from './utils';

export class Board {
    private grid: (Piece | null)[][];

    constructor() {
        this.grid = this.initializeBoard();
    }

    private initializeBoard(): (Piece | null)[][] {
        const grid: (Piece | null)[][] = Array(8)
            .fill(null)
            .map(() => Array(8).fill(null));

        // Initializing Pawns
        for (let col = 0; col < 8; col++) {
            grid[1][col] = new Piece(PieceType.Pawn, PieceColor.White);
            grid[6][col] = new Piece(PieceType.Pawn, PieceColor.Black);
        }

        // Initializing Rooks
        grid[0][0] = grid[0][7] = new Piece(PieceType.Rook, PieceColor.White);
        grid[7][0] = grid[7][7] = new Piece(PieceType.Rook, PieceColor.Black);

        // Initializing Knights
        grid[0][1] = grid[0][6] = new Piece(PieceType.Knight, PieceColor.White);
        grid[7][1] = grid[7][6] = new Piece(PieceType.Knight, PieceColor.Black);

        // Initializing Bishops
        grid[0][2] = grid[0][5] = new Piece(PieceType.Bishop, PieceColor.White);
        grid[7][2] = grid[7][5] = new Piece(PieceType.Bishop, PieceColor.Black);

        // Initializing Queens
        grid[0][3] = new Piece(PieceType.Queen, PieceColor.White);
        grid[7][3] = new Piece(PieceType.Queen, PieceColor.Black);

        // Initializing Kings
        grid[0][4] = new Piece(PieceType.King, PieceColor.White);
        grid[7][4] = new Piece(PieceType.King, PieceColor.Black);

        return grid;
    }

    getPieceAt(position: Position): Piece | null {
        if (!this.isValidPosition(position)) return null;
        return this.grid[position.row][position.col];
    }

    movePiece(from: Position, to: Position): boolean {
        if (!this.isValidPosition(from) || !this.isValidPosition(to)) return false;

        const piece = this.getPieceAt(from);
        if (!piece) return false;

        // Here, additional validation can be done (e.g., using MoveValidator)
        this.grid[to.row][to.col] = piece;
        this.grid[from.row][from.col] = null;
        return true;
    }

    getGrid(): (Piece | null)[][] {
        return this.grid;
    }

    loadGrid(newGrid: (Piece | null)[][]): void {
        this.grid = newGrid;
    }

    printBoard(): void {
        console.log(this.grid.map(row => row.map(cell => (cell ? `${cell.color[0]}${cell.type[0]}` : ' . ')).join(' ')).join('\n'));
    }

    isPathClear(rowDiff: number, colDiff: number, board: Board): boolean {
        const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
        const rowStep = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
        const colStep = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

        let currentRow = 0;
        let currentCol = 0;

        if (rowDiff !== 0) currentRow = rowStep;
        if (colDiff !== 0) currentCol = colStep;

        for (let step = 1; step < steps; step++) {
            const intermediatePos: Position = {
                row: rowDiff > 0 ? step * rowStep : step * rowStep,
                col: colDiff > 0 ? step * colStep : step * colStep,
            };
            const row = rowDiff > 0 ? step * rowStep : step * rowStep;
            const col = colDiff > 0 ? step * colStep : step * colStep;
            const pos: Position = { row: row, col: col };
            if (board.getPieceAt(pos)) return false;
        }

        return true;
    }

    isValidPosition(position: Position): boolean {
        return position.row >= 0 && position.row < 8 && position.col >= 0 && position.col < 8;
    }
}



