import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import SideLayout from "./SideLayout"
import { Bell } from "lucide-react"


const Layout = () => {
  return (
    <div>
      <SidebarProvider  defaultOpen={true}>
        <SideLayout />
         <div className="flex flex-col w-[100%]">
            <div className="h-[40px] border-b-2 flex justify-between items-center px-[3rem]">
              <SidebarTrigger className="cursor-pointer"/>
              <Bell />
            </div>
            <div className="p-3">
              <Outlet />
            </div>
         </div>
      </SidebarProvider>
    </div>
  )
}

export default Layout
