import { routeEnum } from "@/common/enum/route.enum";
import { useActiveSection } from "@/context/active-section.context";
import { m } from "framer-motion";
import { JSX, useEffect, Suspense, useState } from "react";
import { Element, scroller } from "react-scroll";

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
      {sections.map((section) => (
        <Element name={section.url} key={section.url}>
          {/* Framer Motion viewport tracker: reliably triggers when section reaches the middle of the screen */}
          <m.div
            onViewportEnter={() => {
              if (activeSection.activeSection !== section.url) {
                setActiveSection({
                  activeSection: section.url,
                  previousSection: activeSection.activeSection,
                });
              }
            }}
            viewport={{ margin: "-40% 0px -40% 0px", once: false }}
          >
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
          </m.div>
        </Element>
      ))}
    </div>
  );
}

export default AnimationSection;