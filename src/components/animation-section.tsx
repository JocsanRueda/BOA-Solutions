import { Element } from "react-scroll";
import { motion } from "framer-motion";
import  { JSX, useEffect } from "react";
import { useActiveSection } from "@/context/active-section.context";
import { routeEnum } from "@/common/enum/route.enum";
import {scroller } from "react-scroll"
interface AnimationSectionProps {
  sections: {
    url: string;
    component: JSX.Element;
  }[];
}

export function AnimationSection({ sections }: AnimationSectionProps) {

  const {activeSection,setActiveSection} = useActiveSection()
  const handleTouchMove = (sectionUrl: string) => {
    const newActiveSection = {
      activeSection: sectionUrl,
      previousSection: activeSection.activeSection,
    }
    setActiveSection(newActiveSection); 
  };

  useEffect(() => {

    const specialPages=Object.values(routeEnum)

    if( !specialPages.includes(activeSection.previousSection as routeEnum)){
     
      setTimeout(()=>{
        scroller.scrollTo(activeSection.activeSection, {
     
          smooth: false,
          offset: -41, 
        });
      },20)
    }
  
  }, [activeSection]);
  
  return (
    <div> 
      {sections.map((section) => (
        <Element name={section.url} key={section.url} 
          onTouchStart={() => handleTouchMove(section.url)}
          onTouchMove={() => handleTouchMove(section.url)}
          onTouchEnd={() => handleTouchMove(section.url)}
      
          style={{
            contentVisibility:"auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount:0.2 }}
            onMouseEnter={() => handleTouchMove(section.url)}
            
          >
            {section.component}
          </motion.div>
        </Element>
      ))}
    </div>
  );
}

export default AnimationSection;