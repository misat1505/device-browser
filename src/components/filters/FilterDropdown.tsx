import { type ReactNode, useId } from "react";
import { DropdownArrow } from "./DropdownArrow";
import { useClickOutside } from "../../hooks/useClickOutside";

type FilterDropdownProps = {
  label: string;
  value: string;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  children: ReactNode;
  arrowOffset?: boolean;
  labelOffset?: boolean;
};

export function FilterDropdown({
  label,
  value,
  isOpen,
  onToggle,
  children,
  arrowOffset = false,
  labelOffset = false,
}: FilterDropdownProps) {
  const id = useId();

  const buttonId = `${id}-button`;
  const listboxId = `${id}-listbox`;

  const ref = useClickOutside<HTMLDivElement>(isOpen, () => onToggle(false));

  return (
    <div ref={ref} className="relative min-w-37.5 flex-1">
      <label
        htmlFor={buttonId}
        className={`mb-1.75 block text-[18px] font-bold leading-5.5 text-black ${
          labelOffset ? "translate-y-0.5" : ""
        }`}
        style={{ fontFamily: "SamsungOne" }}
      >
        {label}
      </label>

      <button
        id={buttonId}
        type="button"
        onClick={() => onToggle(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        className="flex w-full items-center justify-between bg-white px-3 py-2 pr-4.75 text-[14px] font-normal leading-5.5 text-black"
        style={{ fontFamily: "SamsungOne" }}
      >
        <span className="truncate">{value}</span>

        <DropdownArrow
          aria-hidden="true"
          className={arrowOffset ? "translate-x-1.75 translate-y-px" : ""}
        />
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="absolute z-20 mt-1.5 w-full min-w-52.5 bg-[#FDFDFD] shadow-[4px_4px_4px_rgba(0,0,0,0.02)]"
        >
          {children}
        </div>
      )}
    </div>
  );
}
