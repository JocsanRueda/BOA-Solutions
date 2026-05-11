import { useEffect, useRef } from "react";
import { useTheme } from "./theme-provider";

export default function GlowBackground() {
  const { theme } = useTheme();
  const gradient = theme === "dark" ? "rgba(0, 128, 255, 0.08)" : "rgba(0, 0, 0, 0.1)";
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updatePosition = (clientX: number, clientY: number) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (glowRef.current) {
            glowRef.current.style.background = `radial-gradient(circle at ${clientX}px ${clientY}px, ${gradient}, rgba(0, 0, 0, 0.1))`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [gradient]);

  return (
    <div
      ref={glowRef}
      // Usamos inset-0 para asegurar que siempre cubra exactamente la pantalla visible (viewport)
      // sin importar si aparece o desaparece la barra de direcciones en móviles.
      className="fixed inset-0 pointer-events-none transition-opacity duration-300"
      style={{
        background: `radial-gradient(circle at 50vw 50vh, ${gradient}, rgba(0, 0, 0, 0.1))`,
        zIndex: 1,
      }}
    />
  );
}
