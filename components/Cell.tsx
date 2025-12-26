"use client";

export default function Cell({
  value,
  fixed,
  selected,
  missing,
  onClick,
}: {
  value: number;
  fixed: boolean;
  selected: boolean;
  missing: boolean;
  onClick: () => void;
}) {
  const bg = selected
    ? "bg-blue-100"
    : missing
    ? "bg-red-100"
    : "bg-white hover:bg-gray-50";

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14",
        "flex items-center justify-center select-none transition-colors",
        fixed ? "font-bold text-gray-900" : "font-medium text-gray-700",
        bg,
      ].join(" ")}
    >
      {value === 0 ? "" : value}
    </button>
  );
}
