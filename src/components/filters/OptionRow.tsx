type OptionRowProps = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
};

export function OptionRow({
  label,
  isSelected,
  onClick,
  className,
}: OptionRowProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      onClick={onClick}
      className={`w-full px-4.25 py-2 text-left hover:bg-[#F7F8FB] ${className}`}
      style={{
        fontFamily: "SamsungOne",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "22px",
        color: "#000000",
      }}
    >
      <span className="truncate">{label}</span>
    </button>
  );
}
