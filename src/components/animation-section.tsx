import { routeEnum } from "@/common/enum/route.enum";
import { useActiveSection } from "@/context/active-section.context";
import { motion } from "framer-motion";
import { JSX, useEffect, Suspense } from "react";
import { Element, scroller } from "react-scroll";
interface AnimationSectionProps {
  sections: {
    url: string;
    component: JSX.Element;
  }[];
}

export function AnimationSection({ sections }: AnimationSectionProps) {

  const { activeSection, } = useActiveSection()

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
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}

          >
            <Suspense fallback={<div className="min-h-screen w-full" />}>
              {section.component}
            </Suspense>
          </motion.div>
        </Element>
      ))}
    </div>
  );
}

export default AnimationSection;