// hooks/useTypingPlaceholder.js
import { useEffect, useState } from "react";

export const useTypingPlaceholder = (
  text,
  speed = 70,
  delay = 2000
) => {
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer;

    if (index < text.length) {
      timer = setTimeout(() => {
        setDisplay((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);
    } else {
      timer = setTimeout(() => {
        setDisplay("");
        setIndex(0);
      }, delay);
    }

    return () => clearTimeout(timer);
  }, [index, text, speed, delay]);

  return display;
};
