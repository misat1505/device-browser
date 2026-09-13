export function ShowMoreButton() {
  return (
    <button className="flex h-5 w-29.5 mx-auto -translate-x-1.25 mt-5 mb-13.5 items-center gap-2.25">
      <span
        className="h-5 w-25.5 text-center text-[18px] font-bold leading-5 text-[#007AFF]"
        style={{
          fontFamily: "SamsungOne",
          fontStyle: "normal",
          fontWeight: 700,
        }}
      >
        Pokaż więcej
      </span>
      <span className="h-0 w-0 border-l-[3.5px] border-r-[3.5px] border-t-[7px] border-l-transparent border-r-transparent border-t-[#007AFF]" />
    </button>
  );
}
