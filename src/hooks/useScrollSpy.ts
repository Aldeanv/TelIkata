import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[], offset = 0) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + offset + 1;

      const sections = ids.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return { id, offsetTop: el.offsetTop };
      }).filter(Boolean) as { id: string; offsetTop: number }[];

      const current = sections.reverse().find((section) => scrollY >= section.offsetTop);
      if (current) setActiveId(current.id);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ids, offset]);

  return activeId;
}
