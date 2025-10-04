"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ProfessionalCursor() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });

    const interactiveElements = document.querySelectorAll("a, button");
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", () => setHovered(true));
      el.addEventListener("mouseleave", () => setHovered(false));
    });

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        animate={{
          x: cursor.x - 8,
          y: cursor.y - 8,
          scale: hovered ? 1.5 : 1,
          opacity: hovered ? 0.7 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="fixed top-0 left-0 w-4 h-4 rounded-full border border-red-600 pointer-events-none z-50 bg-transparent"
      />
    </>
  );
}
