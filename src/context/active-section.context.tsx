import React, { createContext, useContext, useState } from "react";

export type sectionType={
  activeSection: string;
  previousSection: string;
}
interface ActiveSectionContextProps {
  activeSection:sectionType
  setActiveSection: (section: sectionType) => void;
}

const ActiveSectionContext = createContext<ActiveSectionContextProps | undefined>(undefined);

export const ActiveSectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<sectionType>({
    activeSection: "/",
    previousSection: "/",
  });

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
};

export const useActiveSection = () => {
  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error("useActiveSection must be used within an ActiveSectionProvider");
  }
  return context;
};