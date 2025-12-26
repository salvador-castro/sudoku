"use client";

import { useEffect } from "react";
import SudokuBoard from "@/components/SudokuBoard";
import Controls from "@/components/Controls";
import { useSudokuGame } from "@/hooks/useSudokuGame";
import CelebrationModal from "@/components/CelebrationModal";

export default function SudokuPage() {
  const { state, dispatch } = useSudokuGame();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (state.selected === null) return;

      if (e.key >= "1" && e.key <= "9") {
        dispatch({ type: "SET_VALUE", value: Number(e.key) as any });
        return;
      }

      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        dispatch({ type: "CLEAR" });
        return;
      }

      if (e.key === "ArrowUp") dispatch({ type: "MOVE", dir: "up" });
      if (e.key === "ArrowDown") dispatch({ type: "MOVE", dir: "down" });
      if (e.key === "ArrowLeft") dispatch({ type: "MOVE", dir: "left" });
      if (e.key === "ArrowRight") dispatch({ type: "MOVE", dir: "right" });
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [state.selected, dispatch]);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-gray-900">Sudoku</h1>
          <p className="text-sm text-gray-600">
            Jugá sin pistas. Podés escribir cualquier número y validar al final.
          </p>
        </header>

        {/* Flex es muy estable para “tablero izquierda / controles derecha” */}
        <section className="mt-6 flex flex-col md:flex-row md:items-start gap-6">
          {/* Tablero */}
          <div className="flex-1 flex justify-center md:justify-start min-w-0">
            <SudokuBoard
              board={state.current}
              fixed={state.fixed}
              selected={state.selected}
              onSelect={(i) => dispatch({ type: "SELECT", index: i })}
              missingOn={state.missingHighlightOn}
              missingMask={state.missingMask}
            />
          </div>

          {/* Controles */}
          <aside className="w-full md:w-[380px] md:shrink-0 md:sticky md:top-6">
            <Controls
              difficulty={state.difficulty}
              onNew={(d) => dispatch({ type: "NEW_GAME", difficulty: d })}
              onReset={() => dispatch({ type: "RESET" })}
              onValidate={() => dispatch({ type: "VALIDATE" })}
              onSet={(n) => dispatch({ type: "SET_VALUE", value: n as any })}
              onClear={() => dispatch({ type: "CLEAR" })}
            />

            {state.message && (
              <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-3 text-sm text-gray-900 shadow-sm flex items-center justify-between gap-3">
                <span>{state.message}</span>
                <button
                  type="button"
                  className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50"
                  onClick={() => dispatch({ type: "CLEAR_MESSAGE" })}
                >
                  OK
                </button>
              </div>
            )}
          </aside>
        </section>
      </div>

      <CelebrationModal
        open={state.celebrationOpen}
        onClose={() => dispatch({ type: "CLOSE_CELEBRATE" })}
        onDone={() => dispatch({ type: "CELEBRATE_DONE" })}
      />

    </main>
  );
}
