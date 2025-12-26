// lib/sudoku/solver.ts
import { Board, CellValue, SIZE, idx } from "./types";
import { isValidMove } from "./board";

// Encuentra el índice [0..80] de la primera celda vacía, o -1 si no hay
function findEmpty(board: Board) {
    for (let i = 0; i < 81; i++) {
        if (board[i] === 0) return i;
    }
    return -1;
}

// Devuelve los candidatos posibles para (r,c), en orden 1..9
function getCandidates(board: Board, r: number, c: number): CellValue[] {
    const out: CellValue[] = [];
    for (let n = 1 as CellValue; n <= 9; n = (n + 1) as CellValue) {
        if (isValidMove(board, r, c, n)) out.push(n);
    }
    return out;
}

// Solver por backtracking.
// Retorna true si pudo resolver "in-place"
function backtrack(board: Board): boolean {
    const i = findEmpty(board);
    if (i === -1) return true; // no hay vacíos => resuelto

    const r = Math.floor(i / SIZE);
    const c = i % SIZE;

    const candidates = getCandidates(board, r, c);

    for (const n of candidates) {
        board[i] = n;
        if (backtrack(board)) return true;
        board[i] = 0; // deshacer
    }

    return false;
}

// API pública: no muta el input, devuelve Board resuelto o null
export function solve(board: Board): Board | null {
    const copy = board.slice() as Board;
    const ok = backtrack(copy);
    return ok ? copy : null;
}
