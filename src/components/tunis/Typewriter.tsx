import { useEffect, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Cycles through words with a typing/deleting effect and blinking cursor. */
const Typewriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [len, setLen] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const word = words[index % words.length];
    const delay = deleting ? 38 : len === word.length ? 1600 : 75;
    const t = setTimeout(() => {
      if (!deleting) {
        if (len < word.length) setLen(len + 1);
        else setDeleting(true);
      } else if (len > 0) {
        setLen(len - 1);
      } else {
        setDeleting(false);
        setIndex((i) => i + 1);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [len, deleting, index, words, reduced]);

  if (reduced) {
    return <span>{words[0]}</span>;
  }

  return (
    <span aria-label={words.join(", ")}>
      {words[index % words.length].slice(0, len)}
      <span className="typewriter-cursor" />
    </span>
  );
};

export default Typewriter;
