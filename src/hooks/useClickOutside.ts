import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(
  isOpen: boolean,
  onClickOutside: () => void,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClickOutside]);

  return ref;
}
