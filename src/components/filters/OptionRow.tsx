type OptionRowProps = {
  label: string;
  onClick: () => void;
  className?: string;
};

export function OptionRow({ label, onClick, className }: OptionRowProps) {
  return (
    <button
      type="button"
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
