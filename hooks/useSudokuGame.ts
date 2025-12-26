"use client";

import { useEffect, useReducer } from "react";
import type { Board, CellValue, Difficulty } from "@/lib/sudoku/types";
import { generatePuzzle } from "@/lib/sudoku/generator";
import { isConsistentBoard } from "@/lib/sudoku/board";

type State = {
    puzzle: Board;     // givens originales
    current: Board;    // tablero editable
    fixed: boolean[];  // true si la celda es dada
    selected: number | null;
    difficulty: Difficulty;
    message: string | null;
    celebrationOpen: boolean;
    missingHighlightOn: boolean;
    missingMask: boolean[]; // true donde falta (value===0)
};

type Action =
    | { type: "NEW_GAME"; difficulty: Difficulty }
    | { type: "SELECT"; index: number }
    | { type: "SET_VALUE"; value: CellValue }
    | { type: "CLEAR" }
    | { type: "RESET" }
    | { type: "VALIDATE" }
    | { type: "CLEAR_MESSAGE" }
    | { type: "MOVE"; dir: "up" | "down" | "left" | "right" }
    | { type: "CLOSE_CELEBRATE" }
    | { type: "CLEAR_MISSING_HIGHLIGHT" }
    | { type: "CELEBRATE_DONE" };

const emptyBoard = Array(81).fill(0) as Board;

const initialState: State = {
    puzzle: emptyBoard,
    current: emptyBoard,
    fixed: Array(81).fill(false),
    selected: null,
    difficulty: "basic",
    message: null,
    celebrationOpen: false,
    missingHighlightOn: false,
    missingMask: Array(81).fill(false),

};

function isComplete(board: Board) {
    return board.every((v) => v !== 0);
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "NEW_GAME": {
            const { puzzle } = generatePuzzle(action.difficulty);
            return {
                puzzle,
                current: puzzle.slice() as Board,
                fixed: puzzle.map((v) => v !== 0),
                selected: puzzle.findIndex((v) => v === 0) ?? 0,
                difficulty: action.difficulty,
                message: null,
                celebrationOpen: false,
                missingHighlightOn: false,
                missingMask: Array(81).fill(false),
            };
        }

        case "MOVE": {
            if (state.selected === null) return state;

            const r = Math.floor(state.selected / 9);
            const c = state.selected % 9;

            let nr = r, nc = c;
            if (action.dir === "up") nr = Math.max(0, r - 1);
            if (action.dir === "down") nr = Math.min(8, r + 1);
            if (action.dir === "left") nc = Math.max(0, c - 1);
            if (action.dir === "right") nc = Math.min(8, c + 1);

            return { ...state, selected: nr * 9 + nc };
        }

        case "SELECT":
            return { ...state, selected: action.index };

        case "SET_VALUE": {
            const i = state.selected;
            if (i === null || state.fixed[i]) return state;

            const next = state.current.slice() as Board;
            next[i] = action.value; // <-- sin isValidMove
            return { ...state, current: next };
        }

        case "CLEAR": {
            const i = state.selected;
            if (i === null || state.fixed[i]) return state;

            const next = state.current.slice() as Board;
            next[i] = 0;
            return { ...state, current: next };
        }

        case "RESET":
            return {
                ...state,
                current: state.puzzle.slice() as Board,
                message: null,
                missingHighlightOn: false,
                missingMask: Array(81).fill(false),
            };


        case "VALIDATE": {
            const ok = isConsistentBoard(state.current);
            const complete = isComplete(state.current);

            // si está todo OK y completo: celebrar
            if (ok && complete) {
                return {
                    ...state,
                    celebrationOpen: true,
                    message: null,
                    missingHighlightOn: false,
                    missingMask: Array(81).fill(false),
                };
            }

            // si no hay contradicciones pero falta completar: resaltar vacíos
            if (ok && !complete) {
                const mask = state.current.map((v) => v === 0);
                return {
                    ...state,
                    message: "Faltan casilleros, verificar",
                    missingHighlightOn: true,
                    missingMask: mask,
                };
            }

            // si hay contradicciones
            return {
                ...state,
                message: "Hay contradicciones en el tablero.",
                missingHighlightOn: false,
                missingMask: Array(81).fill(false),
            };
        }

        case "CLEAR_MISSING_HIGHLIGHT":
            return { ...state, missingHighlightOn: false, missingMask: Array(81).fill(false) };

        case "CLOSE_CELEBRATE":
            return { ...state, celebrationOpen: false };

        case "CELEBRATE_DONE": {
            const { puzzle } = generatePuzzle(state.difficulty);
            return {
                ...state,
                puzzle,
                current: puzzle.slice() as Board,
                fixed: puzzle.map((v) => v !== 0),
                selected: puzzle.findIndex((v) => v === 0) ?? 0,
                celebrationOpen: false,
                message: null,
            };
        }

        case "CLEAR_MESSAGE":
            return { ...state, message: null };

        default:
            return state;
    }
}

export function useSudokuGame() {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Generamos el primer Sudoku SOLO en cliente (evita hydration issues)
    useEffect(() => {
        dispatch({ type: "NEW_GAME", difficulty: "basic" });
    }, []);

    useEffect(() => {
        if (!state.missingHighlightOn) return;

        const t = setTimeout(() => {
            dispatch({ type: "CLEAR_MISSING_HIGHLIGHT" });
        }, 5000);

        return () => clearTimeout(t);
    }, [state.missingHighlightOn]);

    return { state, dispatch };
}
