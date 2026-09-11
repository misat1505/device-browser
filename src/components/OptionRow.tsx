type OptionRowProps = {
  label: string;
  onClick: () => void;
};

export function OptionRow({ label, onClick }: OptionRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-[14px] text-[#11151C] hover:bg-[#F7F8FB]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <span className="truncate">{label}</span>
    </button>
  );
}
