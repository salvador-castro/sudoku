// lib/sudoku/generator.ts
import { Board, CellValue, Difficulty } from "./types";
import { isValidMove } from "./board";
import { countSolutions } from "./solutions";

const emptyBoard = Array(81).fill(0) as Board;

function shuffle<T>(arr: T[]) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function findEmpty(board: Board) {
    for (let i = 0; i < 81; i++) if (board[i] === 0) return i;
    return -1;
}

function randomizedCandidates(): CellValue[] {
    return shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9] as CellValue[]);
}

// Llena el tablero completo con backtracking random
function fillBoard(board: Board): boolean {
    const i = findEmpty(board);
    if (i === -1) return true;

    const r = Math.floor(i / 9);
    const c = i % 9;

    for (const n of randomizedCandidates()) {
        if (!isValidMove(board, r, c, n)) continue;
        board[i] = n;
        if (fillBoard(board)) return true;
        board[i] = 0;
    }
    return false;
}

function makeFullSolution(): Board {
    const b = emptyBoard.slice() as Board;
    fillBoard(b);
    return b;
}

// Cantidad de celdas a dejar como "givens" (aprox)
function givensForDifficulty(d: Difficulty) {
    if (d === "basic") return 40;
    if (d === "intermediate") return 32;
    return 26; // advanced
}

export function generatePuzzle(difficulty: Difficulty) {
    // 1) solución completa
    const solution = makeFullSolution();

    // 2) puzzle empieza igual a la solución y vamos quitando valores
    let puzzle = solution.slice() as Board;

    // índices 0..80 en orden aleatorio
    const positions = shuffle([...Array(81)].map((_, i) => i));

    const targetGivens = givensForDifficulty(difficulty);

    for (const pos of positions) {
        // si ya llegamos a los givens deseados, paramos
        const currentGivens = puzzle.reduce<number>(
            (acc, v) => acc + (v !== 0 ? 1 : 0),
            0
        );
        if (currentGivens <= targetGivens) break;

        const backup = puzzle[pos];
        puzzle[pos] = 0;

        // 3) aseguramos unicidad: si deja de ser única, revertimos
        const solCount = countSolutions(puzzle, 2);
        if (solCount !== 1) {
            puzzle[pos] = backup;
        }
    }

    return { puzzle, solution };
}
