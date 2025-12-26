// lib/sudoku/board.ts
import { Board, CellValue, BOX, SIZE, idx } from "./types";

// Devuelve los 9 valores de una fila
export function getRow(board: Board, r: number): CellValue[] {
    const out: CellValue[] = [];
    for (let c = 0; c < SIZE; c++) out.push(board[idx(r, c)]);
    return out;
}

// Devuelve los 9 valores de una columna
export function getCol(board: Board, c: number): CellValue[] {
    const out: CellValue[] = [];
    for (let r = 0; r < SIZE; r++) out.push(board[idx(r, c)]);
    return out;
}

// Devuelve los 9 valores de la caja 3x3 donde cae (r,c)
export function getBox(board: Board, r: number, c: number): CellValue[] {
    const out: CellValue[] = [];
    const r0 = Math.floor(r / BOX) * BOX; // fila inicial de la caja
    const c0 = Math.floor(c / BOX) * BOX; // col inicial de la caja

    for (let rr = r0; rr < r0 + BOX; rr++) {
        for (let cc = c0; cc < c0 + BOX; cc++) {
            out.push(board[idx(rr, cc)]);
        }
    }
    return out;
}

// true si en la lista NO hay duplicados (ignorando 0)
function noDuplicates(values: CellValue[]) {
    const seen = new Set<number>();
    for (const v of values) {
        if (v === 0) continue;
        if (seen.has(v)) return false;
        seen.add(v);
    }
    return true;
}

// Verifica si poner "value" en (r,c) es válido según reglas
// (asume que board[idx(r,c)] puede ser 0 o el mismo value si estás reescribiendo)
export function isValidMove(
    board: Board,
    r: number,
    c: number,
    value: CellValue
) {
    if (value === 0) return true;

    // Chequeo fila
    for (let cc = 0; cc < SIZE; cc++) {
        if (cc === c) continue;
        if (board[idx(r, cc)] === value) return false;
    }

    // Chequeo columna
    for (let rr = 0; rr < SIZE; rr++) {
        if (rr === r) continue;
        if (board[idx(rr, c)] === value) return false;
    }

    // Chequeo caja 3x3
    const r0 = Math.floor(r / BOX) * BOX;
    const c0 = Math.floor(c / BOX) * BOX;
    for (let rr = r0; rr < r0 + BOX; rr++) {
        for (let cc = c0; cc < c0 + BOX; cc++) {
            if (rr === r && cc === c) continue;
            if (board[idx(rr, cc)] === value) return false;
        }
    }

    return true;
}

// Verifica que el tablero entero no tenga contradicciones
export function isConsistentBoard(board: Board) {
    for (let r = 0; r < SIZE; r++) {
        if (!noDuplicates(getRow(board, r))) return false;
    }
    for (let c = 0; c < SIZE; c++) {
        if (!noDuplicates(getCol(board, c))) return false;
    }
    for (let br = 0; br < BOX; br++) {
        for (let bc = 0; bc < BOX; bc++) {
            const r0 = br * BOX;
            const c0 = bc * BOX;
            if (!noDuplicates(getBox(board, r0, c0))) return false;
        }
    }
    return true;
}
