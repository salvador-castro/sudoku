"use client";

import type { Difficulty } from "@/lib/sudoku/types";

export default function Controls({
  difficulty,
  onNew,
  onReset,
  onValidate,
  onSet,
  onClear,
}: {
  difficulty: Difficulty;
  onNew: (d: Difficulty) => void;
  onReset: () => void;
  onValidate: () => void;
  onSet: (n: number) => void;
  onClear: () => void;
}) {
  const baseBtn =
    "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold transition active:scale-[0.98] border";
  const ghost =
    "bg-white hover:bg-gray-50 border-gray-200 text-gray-900";
  const primary =
    "bg-gray-900 hover:bg-gray-800 border-gray-900 text-white";

  const pill = (active: boolean) =>
    [
      baseBtn,
      active ? primary : ghost,
      "w-full",
    ].join(" ");

  const actionBtn = (variant: "primary" | "ghost") =>
    [
      baseBtn,
      variant === "primary" ? primary : ghost,
      "w-full",
    ].join(" ");

  const keyBtn =
    "h-11 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-semibold text-gray-900 transition active:scale-[0.98]";

  return (
    <aside className="w-full max-w-sm">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-gray-900">Controles</div>
            <div className="mt-1 text-xs text-gray-500">
              Sin hints. Escribí libre y luego validá.
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Dificultad:{" "}
            <span className="font-semibold text-gray-900">
              {difficulty === "basic"
                ? "Básico"
                : difficulty === "intermediate"
                ? "Intermedio"
                : "Avanzado"}
            </span>
          </div>
        </div>

        {/* Dificultad */}
        <div className="mt-4">
          <div className="text-xs font-medium text-gray-600 mb-2">
            Nuevo juego
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              className={pill(difficulty === "basic")}
              onClick={() => onNew("basic")}
            >
              Básico
            </button>
            <button
              type="button"
              className={pill(difficulty === "intermediate")}
              onClick={() => onNew("intermediate")}
            >
              Intermedio
            </button>
            <button
              type="button"
              className={pill(difficulty === "advanced")}
              onClick={() => onNew("advanced")}
            >
              Avanzado
            </button>
          </div>
        </div>

        {/* Acciones */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            className={actionBtn("ghost")}
            onClick={onReset}
          >
            Limpiar
          </button>
          <button
            type="button"
            className={actionBtn("primary")}
            onClick={onValidate}
          >
            Validar
          </button>
        </div>

        {/* Keypad */}
        <div className="mt-4">
          <div className="text-xs font-medium text-gray-600 mb-2">
            Números
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <button
                key={n}
                type="button"
                className={keyBtn}
                onClick={() => onSet(n)}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              className={`${keyBtn} col-span-2`}
              onClick={onClear}
            >
              Borrar
            </button>
          </div>

          <div className="mt-3 text-[11px] text-gray-500">
            Atajos: 1–9 para escribir · 0/Backspace/Delete para borrar · flechas para moverte
          </div>
        </div>
      </div>
    </aside>
  );
}
