"use client";

import { useEffect, useState } from "react";

type Drop = {
  id: number;
  leftPct: number;   // 0..100
  delayMs: number;   // retraso
  durMs: number;     // duración
  sizePx: number;    // tamaño
  driftPx: number;   // deriva horizontal
};

export default function CelebrationModal({
  open,
  onClose,
  onDone,
}: {
  open: boolean;
  onClose: () => void;
  onDone: () => void;
}){
  const [drops, setDrops] = useState<Drop[]>([]);

  useEffect(() => {
    if (!open) return;

    // Generamos "gotas" solo cuando abre (evita hydration issues)
    const count = 40;
    const next: Drop[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      leftPct: Math.random() * 100,
      delayMs: Math.floor(Math.random() * 600),
      durMs: 1200 + Math.floor(Math.random() * 1200),
      sizePx: 18 + Math.floor(Math.random() * 18),
      driftPx: -40 + Math.floor(Math.random() * 80),
    }));
    setDrops(next);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      aria-modal="true"
      role="dialog"
    >
      {/* overlay */}
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Cerrar"
      />

      {/* lluvia */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {drops.map((d) => (
          <span
            key={d.id}
            className="absolute -top-10"
            style={{
              left: `${d.leftPct}%`,
              fontSize: `${d.sizePx}px`,
              animationDelay: `${d.delayMs}ms`,
              animationDuration: `${d.durMs}ms`,
              transform: `translateX(${d.driftPx}px)`,
              animationName: "emoji-fall",
              animationTimingFunction: "linear",
              animationIterationCount: 1,
              animationFillMode: "forwards",
            }}
          >
            🥳
          </span>
        ))}
      </div>

      {/* caja modal */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-xl">
          <div className="p-5">
            <div className="text-2xl font-bold text-gray-900">
              ¡Felicitaciones! 🥳
            </div>
            <p className="mt-2 text-sm text-gray-600">
              No hay errores. ¡Excelente trabajo!
            </p>

            <div className="mt-5 flex justify-end">
  <button
  type="button"
  className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 active:scale-[0.98]"
  onClick={onDone}
>
  Cerrar
</button>

</div>

          </div>
        </div>
      </div>

      {/* keyframes */}
      <style jsx global>{`
        @keyframes emoji-fall {
          0% {
            transform: translateY(-40px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
