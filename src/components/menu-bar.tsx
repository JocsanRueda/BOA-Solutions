import { useCallback } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "./theme-provider"
import { Link } from "react-scroll"
import { data } from "@/data/menu/menu-bar.data"
import { SidebarTrigger } from "./ui/sidebar"
import { useActiveSection } from "@/context/active-section.context"
import { cn } from "@/lib/utils"
import { routeEnum } from "@/common/enum/route.enum"
export function MenuBar() {

  const { setTheme,theme } = useTheme()

  const {activeSection, setActiveSection} = useActiveSection()

  const handleClick = useCallback(() => {
    if(theme==="dark"){
      setTheme("light")
    }else{
      setTheme("dark")
    }
  }, [theme, setTheme]);
  
  const handleScrollToSection = useCallback((sectionName: string) => {
    const newActiveSection = {
      activeSection: sectionName,
      previousSection: window.location.pathname,
    }

    setActiveSection(newActiveSection);

    if(window.location.pathname !== routeEnum.HOME){
      window.history.back()
    }
  }, [setActiveSection]);
 
  return (
        
    <NavigationMenu className=" mb-0.5 flex flex-row  justify-between border-b border-dashed backdrop-blur-[5px]   max-w-none px-2 fixed z-10 w-full py-0.5 " >

      <NavigationMenuLink className="block sm:hidden">
          
        <SidebarTrigger/>
         
      </NavigationMenuLink>

      <NavigationMenuList className="text-sm gap-1 md:gap-4">

        {
          data.map((link)=>(
            <NavigationMenuItem key={link.name} className="hidden sm:block">
              <Link className={cn("font-light data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all focus-visible:ring-4 focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4 cursor-pointer  ",activeSection.activeSection===link.url?"font-semibold":"font-light")} to={link.url} smooth={true} duration={500}  onClick={()=>handleScrollToSection(link.url)}  offset={35} ignoreCancelEvents={false}>{link.name} </Link>  </NavigationMenuItem>

          ))
        }

      </NavigationMenuList>

      <NavigationMenuList className="text-sm gap-1 md:gap-2">
        <NavigationMenuItem>
          <NavigationMenuLink  className="font-light data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4 cursor-pointer"  onClick={handleClick} 
          ><Switch checked={theme==="dark"} title="change theme"/></NavigationMenuLink>
        </NavigationMenuItem>
        
      </NavigationMenuList>
          
    </NavigationMenu>
   
  )
}