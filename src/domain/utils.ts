export interface Position {
    row: number;
    col: number;
}

export const isSamePosition = (pos1: Position, pos2: Position): boolean => {
    return pos1.row === pos2.row && pos1.col === pos2.col;
};



