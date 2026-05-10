/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "./theme-provider"
import { Link as ScrollLink } from "react-scroll"
import { data } from "@/data/menu/menu-bar.data"
import { SidebarTrigger } from "./ui/sidebar"
import { useActiveSection } from "@/context/active-section.context"
import { cn } from "@/lib/utils"
import { routeEnum } from "@/common/enum/route.enum"

export function MenuBar() {
  const { setTheme, theme } = useTheme()
  const { activeSection, setActiveSection } = useActiveSection()
  const navigate = useNavigate()
  const location = useLocation()

  const handleClickTheme = useCallback(() => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }, [theme, setTheme]);
  
  const handleScrollToSection = useCallback((sectionName: string) => {
    setActiveSection({
      activeSection: sectionName,
      previousSection: location.pathname,
    });

    if (sectionName === routeEnum.FORM) {
      navigate(routeEnum.FORM);
    } else if (location.pathname !== routeEnum.HOME) {
      navigate(routeEnum.HOME);
    }
  }, [setActiveSection, location.pathname, navigate]);
 
  return (
    <NavigationMenu className="mb-0.5 flex flex-row justify-between border-b border-dashed backdrop-blur-[5px] max-w-none px-2 fixed z-100 w-full py-0.5">
      <NavigationMenuLink className="block sm:hidden">
        <SidebarTrigger/>
      </NavigationMenuLink>

      <NavigationMenuList className="text-sm gap-1 md:gap-4">
        {data.map((link) => {
          const isFormPageLink = link.url === routeEnum.FORM;
          const isActive = activeSection.activeSection === link.url;
          
          return (
            <NavigationMenuItem key={link.name} className="hidden sm:block">
              {isFormPageLink || location.pathname !== routeEnum.HOME ? (
                <div 
                  className={cn("font-light data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-[background-color,box-shadow,opacity] focus-visible:ring-4 focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4 cursor-pointer", isActive ? "font-semibold" : "font-light")} 
                  onClick={() => handleScrollToSection(link.url)}
                >
                  {link.name} 
                </div>
              ) : (
                <ScrollLink 
                  className={cn("font-light data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-[background-color,box-shadow,opacity] focus-visible:ring-4 focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4 cursor-pointer", isActive ? "font-semibold" : "font-light")} 
                  to={link.url} 
                  smooth={true} 
                  spy={true}
                  onSetActive={() => handleScrollToSection(link.url)}
                  duration={500}  
                  onClick={() => handleScrollToSection(link.url)}  
                  offset={35} 
                  ignoreCancelEvents={false}
                >
                  {link.name} 
                </ScrollLink>
              )}
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>

      <NavigationMenuList className="text-sm gap-1 md:gap-2">
        <NavigationMenuItem>
          <NavigationMenuLink 
            className="font-light data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-[background-color,box-shadow,opacity] focus-visible:ring-4 focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4 cursor-pointer" 
            onClick={handleClickTheme} 
          >
            <Switch checked={theme==="dark"} title="change theme"/>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}