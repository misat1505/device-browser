import { useEffect, useRef, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type FilterDropdownProps = {
  label: string;
  value: string;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  children: ReactNode;
};

export function FilterDropdown({
  label,
  value,
  isOpen,
  onToggle,
  children,
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
        className="mb-1.5 block text-[13px] font-medium text-[#6B7280]"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {label}
      </span>
      <button
        type="button"
        onClick={() => onToggle(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-[#E5E8EF] bg-white px-3.5 py-2.5 text-left text-[14px] text-[#11151C] transition-colors hover:border-[#C7CDDA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1447E6]/40"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#9AA2AF] transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-1.5 w-full min-w-52.5 overflow-hidden rounded-lg border border-[#E5E8EF] bg-white py-1.5 shadow-[0_8px_24px_rgba(17,21,28,0.12)]">
          {children}
        </div>
      )}
    </div>
  );
}
