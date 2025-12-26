"use client";

import Cell from "./Cell";

export default function SudokuBoard({
  board,
  fixed,
  selected,
  onSelect,
  missingOn,
  missingMask,
}: {
  board: number[];
  fixed: boolean[];
  selected: number | null;
  onSelect: (i: number) => void;
  missingOn: boolean;
  missingMask: boolean[];
}) {
  return (
    <div className="inline-block rounded-2xl overflow-hidden border-2 border-gray-900 bg-white shadow-sm">
      <div className="grid grid-cols-9">
        {board.map((v, i) => {
          const r = Math.floor(i / 9);
          const c = i % 9;

          let cls = "border border-gray-200";
          if (c % 3 === 0) cls += " border-l-2 border-l-gray-900";
          if (r % 3 === 0) cls += " border-t-2 border-t-gray-900";
          if (c === 8) cls += " border-r-2 border-r-gray-900";
          if (r === 8) cls += " border-b-2 border-b-gray-900";

          return (
            <div key={i} className={cls}>
              <Cell
                value={v}
                fixed={fixed[i]}                    // ✅ boolean
                selected={selected === i}           // ✅ boolean
                missing={missingOn && missingMask[i] && v === 0} // ✅ boolean
                onClick={() => onSelect(i)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
