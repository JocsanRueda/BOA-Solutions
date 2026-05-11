/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { routeEnum } from "@/common/enum/route.enum"
import { useNavigate, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useActiveSection } from "@/context/active-section.context"
import { data } from "@/data/menu/menu-bar.data"
import { cn } from "@/lib/utils"

import { Link as ScrollLink } from "react-scroll"

import {ArrowLeft } from "lucide-react"

export function AppSidebar() {
  const { activeSection, setActiveSection } = useActiveSection()
  const { toggleSidebar } = useSidebar()
  const navigate = useNavigate()
  const location = useLocation()

  const handleActiveSection = (sectionName: string) => {
    setActiveSection({
      activeSection: sectionName,
      previousSection: activeSection.activeSection,
    });
  }

  const handleClick = (sectionName: string) => {
    setActiveSection({
      activeSection: sectionName,
      previousSection: location.pathname,
    });

    if (sectionName === routeEnum.FORM) {
      navigate(routeEnum.FORM);
    } else if (location.pathname !== routeEnum.HOME) {
      navigate(routeEnum.HOME);
    }
  };

  return (
    <Sidebar className="border-r border-dashed backdrop-blur-[2px] z-100 ">
      <SidebarContent className="flex flex-col">
        <SidebarGroup>
       
          <SidebarGroupContent>
            <SidebarMenu className="mt-3">

              <SidebarMenuItem className="" >
                <SidebarMenuButton onClick={toggleSidebar}>
                  <div className="flex flex-row items-center gap-1">
                    <ArrowLeft className="scale-85 -ml-1" onClick={(e) => e.stopPropagation()} />
                    Volver
                  </div>
                  
                </SidebarMenuButton>
              </SidebarMenuItem>
              {data.map((item) => {
                const isFormPageLink = item.url === routeEnum.FORM;
                const isActive = activeSection.activeSection === item.url;
                
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      {isFormPageLink || location.pathname !== routeEnum.HOME ? (
                        <div 
                          className={cn("cursor-pointer", isActive ? "font-bold" : "font-normal")}
                          onClick={() => handleClick(item.url)}
                        >
                          <item.icon />
                          {item.name}
                        </div>
                      ) : (
                        <ScrollLink 
                          to={item.url} 
                          smooth={true} 
                          duration={500} 
                          onSetActive={() => handleActiveSection(item.url)} 
                          spy={true} 
                          className={cn("cursor-pointer", isActive ? "font-bold" : "font-normal")} 
                          onClick={() => handleClick(item.url)}
                          offset={-35} 
                        >
                          <item.icon />
                          {item.name}
                        </ScrollLink>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
