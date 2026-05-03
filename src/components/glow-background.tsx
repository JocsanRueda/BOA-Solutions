import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

export default function GlowBackground() {
  const [position, setPosition] = useState({ x: "50%", y: "50%" });
  const {theme}=useTheme()
  const gradient= theme==="dark" ? "rgba(0, 128, 255, 0.08)" : "rgba(0, 0, 0, 0.1)"

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setPosition({ x: `${x}%`, y: `${y}%` });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth) * 100;
        const y = (touch.clientY / window.innerHeight) * 100;
        setPosition({ x: `${x}%`, y: `${y}%` });
      }
   
    };

    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none "
  
      style={{
    
        background: `radial-gradient(circle at ${position.x} ${position.y}, ${gradient}, rgba(0, 0, 0, 0.1))`,
        transition: "background 0.1s ease-out",
        zIndex: 10,
        
      }}
    />
  );
}
