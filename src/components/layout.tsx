import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { MenuBar } from "./menu-bar"

import Footer from "./footer"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (

    <SidebarProvider className="flex flex-row overflow-x-hidden justify-center ">
      {/**add h-screen */}
      <AppSidebar  />
      <MenuBar />
      <main className="flex-grow flex flex-col min-h-screen">
       
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
        
      </main>
      
    </SidebarProvider>
  )
}
