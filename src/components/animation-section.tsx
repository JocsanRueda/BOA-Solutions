import { routeEnum } from "@/common/enum/route.enum";
import { useActiveSection } from "@/context/active-section.context";
import { m } from "framer-motion";
import { JSX, useEffect, Suspense, useState } from "react";
import { Element, scroller, Link as ScrollLink } from "react-scroll";

interface AnimationSectionProps {
  sections: {
    url: string;
    component: JSX.Element;
  }[];
}

export function AnimationSection({ sections }: AnimationSectionProps) {

  const { activeSection, setActiveSection } = useActiveSection()

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handleUserInteraction = () => {
      setIsMounted(true);
      ["scroll", "mousemove", "touchstart", "keydown"].forEach(evt => 
        window.removeEventListener(evt, handleUserInteraction)
      );
    };

    ["scroll", "mousemove", "touchstart", "keydown"].forEach(evt => 
      window.addEventListener(evt, handleUserInteraction, { once: true, passive: true })
    );

    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
      ["scroll", "mousemove", "touchstart", "keydown"].forEach(evt => 
        window.removeEventListener(evt, handleUserInteraction)
      );
    };
  }, []);

  useEffect(() => {
    const specialPages = Object.values(routeEnum)

    if (!specialPages.includes(activeSection.previousSection as routeEnum)) {

      setTimeout(() => {
        scroller.scrollTo(activeSection.activeSection, {

          smooth: false,
          offset: -41,
        });
      }, 20)
    }

  }, [activeSection]);

  return (
    <div>
      {/* Rastreadores globales invisibles: garantizan que setActiveSection funcione en móviles */}
      <div className="fixed top-0 left-0 w-0 h-0 overflow-hidden pointer-events-none opacity-0" aria-hidden="true">
        {sections.map((section) => (
          <ScrollLink
            key={`tracker-${section.url}`}
            to={section.url}
            spy={true}
            onSetActive={() => {
              setActiveSection({
                activeSection: section.url,
                previousSection: activeSection.activeSection,
              });
            }}
            offset={-100}
            containerId=""
          />
        ))}
      </div>

      {sections.map((section) => (
        <Element name={section.url} key={section.url}>
          <m.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}

          >
            <Suspense fallback={<div className="min-h-screen w-full" />}>
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison */}
              {section.url === routeEnum.HOME || isMounted ? (
                section.component
              ) : (
                <div className="min-h-screen w-full" />
              )}
            </Suspense>
          </m.div>
        </Element>
      ))}
    </div>
  );
}

export default AnimationSection;