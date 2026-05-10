import { routeEnum } from "@/common/enum/route.enum"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useActiveSection } from "@/context/active-section.context"
import { data } from "@/data/menu/menu-bar.data"
import { cn } from "@/lib/utils"

import { Link } from "react-scroll"
export function AppSidebar() {
  const { activeSection, setActiveSection } = useActiveSection()

  const handleActiveSection = (sectionName: string) => {
    const newActiveSection = {
      activeSection: sectionName,
      previousSection: activeSection.activeSection,
    }
    setActiveSection(newActiveSection);
  }

  const handleClick = (sectionName: string) => {
    const newActiveSection = {
      activeSection: sectionName,
      previousSection: window.location.pathname,
    }

    setActiveSection(newActiveSection);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (window.location.pathname !== routeEnum.HOME) {
      window.history.back()
    }
  };

  return (
    <Sidebar className="border-r border-dashed backdrop-blur-[2px]  z-10">

      <SidebarContent className="flex flex-col  ">

        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>

          <SidebarGroupContent>

            <SidebarMenu >
              {data.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} smooth={true} duration={500} onSetActive={() => { handleActiveSection(item.url); }} spy={true} className={cn(activeSection.activeSection === item.url ? "font-bold" : "font-normal")} onClick={() => { handleClick(item.url); }}
                      offset={-35} >
                      <item.icon />
                      {item.name}

                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
