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

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    // Use passive event listeners to prevent blocking the native mobile scroll
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [gradient]);

  return (
    <div
      ref={glowRef}
      // w-full y h-[150vh] soluciona el problema de la barra de direcciones en móviles
      className="fixed top-0 left-0 w-full h-[150vh] pointer-events-none"
      style={{
        background: `radial-gradient(circle at 50vw 50vh, ${gradient}, rgba(0, 0, 0, 0.1))`,
        zIndex: 10,
      }}
    />
  );
}
