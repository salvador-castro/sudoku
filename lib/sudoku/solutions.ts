// lib/sudoku/solutions.ts
import { Board, CellValue, SIZE } from "./types";
import { isValidMove } from "./board";

function findEmpty(board: Board) {
    for (let i = 0; i < 81; i++) {
        if (board[i] === 0) return i;
    }
    return -1;
}

function candidates(board: Board, r: number, c: number): CellValue[] {
    const out: CellValue[] = [];
    for (let n = 1 as CellValue; n <= 9; n = (n + 1) as CellValue) {
        if (isValidMove(board, r, c, n)) out.push(n);
    }
    return out;
}

// Cuenta soluciones, pero corta si llega a "limit"
function backtrackCount(board: Board, limit: number): number {
    const i = findEmpty(board);
    if (i === -1) return 1;

    const r = Math.floor(i / SIZE);
    const c = i % SIZE;

    let count = 0;
    for (const n of candidates(board, r, c)) {
        board[i] = n;
        count += backtrackCount(board, limit);
        board[i] = 0;

        if (count >= limit) return count; // corte temprano
    }
    return count;
}

// API pública
export function countSolutions(board: Board, limit = 2) {
    const copy = board.slice() as Board;
    return backtrackCount(copy, limit);
}
