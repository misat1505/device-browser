type DropdownArrowProps = {
  className?: string;
};

export function DropdownArrow({ className = "" }: DropdownArrowProps) {
  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.62915 9.75L11.2583 0H-1.4782e-05L5.62915 9.75Z"
        fill="#8D8D8D"
      />
    </svg>
  );
}
