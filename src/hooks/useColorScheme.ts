import { useEffect, useState } from "react";

export type ColorScheme = "light" | "dark";

export default function useColorScheme(): ColorScheme {
  const [scheme, setScheme] = useState<ColorScheme>(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setScheme(media.matches ? "dark" : "light");
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return scheme;
}
