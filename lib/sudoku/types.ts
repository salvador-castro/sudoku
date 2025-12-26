// lib/sudoku/types.ts

// 0 = celda vacía, 1..9 valores válidos
export type CellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// Tablero = array de 81 celdas (fila mayor: primero fila 0 completa, después fila 1, etc.)
export type Board = CellValue[]; // longitud 81

export type Difficulty = "basic" | "intermediate" | "advanced";

export const SIZE = 9; // 9x9
export const BOX = 3;  // cajas 3x3

// Convierte (fila, columna) -> índice del array [0..80]
export function idx(r: number, c: number) {
    return r * SIZE + c;
}
