import { useEffect, useRef, type ReactNode } from "react";

type FilterDropdownProps = {
  label: string;
  value: string;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  children: ReactNode;
  idx: number;
};

export function FilterDropdown({
  label,
  value,
  isOpen,
  onToggle,
  children,
  idx,
}: FilterDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
        onToggle(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onToggle]);

  return (
    <div ref={ref} className="relative flex-1 min-w-37.5">
      <span
        className={`mb-1.75 block text-black ${idx < 2 ? "translate-y-0.5" : null}`}
        style={{
          fontFamily: "SamsungOne",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "22px",
          fontSize: "18px",
        }}
      >
        {label}
      </span>
      <button
        type="button"
        onClick={() => onToggle(!isOpen)}
        className="flex w-full items-center justify-between bg-white pl-3 pr-4.75 py-2 text-black"
        style={{
          fontFamily: "SamsungOne",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "22px",
          fontSize: "14px",
        }}
      >
        <span className="truncate">{value}</span>
        <svg
          width="12"
          height="10"
          viewBox="0 0 12 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={idx >= 2 ? "translate-x-1.75 translate-y-px" : ""}
        >
          <path
            d="M5.62915 9.75L11.2583 0H-1.4782e-05L5.62915 9.75Z"
            fill="#8D8D8D"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-1.5 w-full min-w-52.5 overflow-hidden bg-[#FDFDFD] shadow-[4px_4px_4px_rgba(0, 0, 0, 0.02)]">
          {children}
        </div>
      )}
    </div>
  );
}
