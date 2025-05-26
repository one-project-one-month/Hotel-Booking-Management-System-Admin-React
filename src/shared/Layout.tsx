import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet, useNavigate } from "react-router-dom"
import SideLayout from "./SideLayout"
import { Bell } from "lucide-react"
import { useEffect } from "react"


const Layout = () => {
  
  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem("token")

    if(!token){
      navigate("/auth/login")
    }
  })

  return (
    <div className="select-none">
      <SidebarProvider  defaultOpen={true}>
        <SideLayout />
         <div className="flex flex-col w-[100%]">
            <div className="h-[40px] border-b-2 flex justify-between items-center px-[3rem]">
              <SidebarTrigger className="cursor-pointer"/>
              <Bell />
            </div>
            <div className="px-5 py-2">
              <Outlet />
            </div>
         </div>
      </SidebarProvider>
    </div>
  )
}

export default Layout
