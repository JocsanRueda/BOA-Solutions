import { useActiveSection } from "@/context/active-section.context";
import { cn } from "@/lib/utils";
import { routeEnum } from "@/common/enum/route.enum";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function BlurBackground() {
  const { activeSection } = useActiveSection()
  const location = useLocation()
  const [blur, setBlur] = useState(0);

  useEffect(() => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (activeSection.activeSection === routeEnum.HOME && location.pathname === routeEnum.HOME)
      setBlur(0)
    else
      setBlur(2)

  }, [activeSection, location.pathname])

  const blurClass = clsx({
    "backdrop-blur-0": blur === 0,
    "backdrop-blur-[2px]": blur === 1,
    "backdrop-blur-[5px]": blur === 2,
  });

  return (
    <div
      className={cn("fixed inset-0 w-full h-full pointer-events-none transition-[backdrop-filter] duration-700 ease-in-out ", blurClass)}

      style={{
        zIndex: -2,
      }}
    />
  );
}
